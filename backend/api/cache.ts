import { CacheKeyInput } from './../../shared/types/cache';
import { Context } from '../../shared/types/authentication';
import CacheManager from '../cache/cache-manager';

class CacheAPI {
  public static async getCacheKeys(args: any, context: Context) {
    return CacheManager.getKeys();
  }

  public static async setCacheKeyTtl(args: { input: CacheKeyInput }, context: Context) {
    await CacheManager.setTtlForKey(args.input.name, args.input.ttl);
    return true;
  }

  public static async resetCacheKeyTtl(args: { name: string }, context: Context) {
    await CacheManager.resetTtlForKey(args.name);
    return true;
  }
}

export default CacheAPI;
