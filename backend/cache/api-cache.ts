import ms from 'ms';
import cache from './index';
import CacheManager from './cache-manager';

interface MethodConfig {
  method: Function,
  methodKey: string,
  cacheKey: string,
  expiresAt: number|null,
  args: any,
  context: any,
};

interface MethodConfigParams {
  ttl: string;
  useContext: boolean;
};

class ApiCache {
  private static checkExpired(cachedData: any): Boolean {
    return cachedData.expiresAt ? Date.now() > cachedData.expiresAt : true;
  }

  private static async runMethod(config: MethodConfig) {
    const data = await config.method(config.args, config.context);
    process.nextTick(() => {
      // TODO - add logging and caching statistics
      CacheManager.markTtlAsUsed(config.methodKey);
      cache.setJSON(config.cacheKey, { data, expiresAt: config.expiresAt });
    });

    return data;
  }

  private static getCachedMethodWrapper(methodKey: string, method: Function, useContext: boolean) {
    return async (args: any, context: any) => {
      const ttl = ms(CacheManager.getTtlForKey(methodKey));
      // always return fresh data if the ttl for a cache key was just changed
      const ttlForKeyIsNew = CacheManager.ttlWasJustSet(methodKey);

      let cacheKey = `${methodKey}-${JSON.stringify(args)}`;

      if (useContext) {
        cacheKey += `-${context.user.get('id')}`;
      }

      const cachedData = await cache.getJSON(cacheKey);
      const methodConfig = {
        method,
        methodKey,
        cacheKey,
        expiresAt: ttl ? ttl + Date.now() : null,
        args,
        context
      };

      if (!cachedData || ttlForKeyIsNew || ttl === 0) {
        return ApiCache.runMethod(methodConfig);
      }

      if (ApiCache.checkExpired(cachedData)) {
        process.nextTick(() => {
          ApiCache.runMethod(methodConfig);
        });
      }

      return cachedData.data;
    }
  }

  public static cachify(Api: any, key: string, config: { [key: string]: MethodConfigParams }) {
    const methods = Object.keys(config);

    methods.forEach((methodName) => {
      const method = Api[methodName];
      const methodKey = `${key}-${methodName}`;
      const methodConfig = config[methodName];

      CacheManager.registerKey(methodKey, methodConfig.ttl);

      if (!method) return;
      Api[methodName] = ApiCache.getCachedMethodWrapper(methodKey, method, methodConfig.useContext);
    });

    return Api;
  }
}

export default ApiCache;
