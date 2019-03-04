import CacheAPI from '../../api/cache';
import wrap from '../utils/wrap';
import { restrictToSuper } from '../../authentication/middleware';

export default {
  Query: {
    cacheKeys: wrap(restrictToSuper, CacheAPI.getCacheKeys),
  },
  Mutation: {
    setCacheKeyTtl: wrap(restrictToSuper, CacheAPI.setCacheKeyTtl),
    resetCacheKeyTtl: wrap(restrictToSuper, CacheAPI.resetCacheKeyTtl),
  },
};
