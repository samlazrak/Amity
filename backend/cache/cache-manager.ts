import CacheKeyModel from '../models/cache-key';

class CacheManager {
  private ttls: { [key: string]: string };
  private databaseTtls: { [key: string]: string };
  private recentlyUpdatedTtls: { [key: string]: boolean };

  constructor() {
    this.ttls = {};
    this.databaseTtls = {};
    this.recentlyUpdatedTtls = {};
    this.initialize();
  }

  /**
   * Load saved ttls from database
   */
  private async initialize() {
    const cacheKeyModels = (await CacheKeyModel.where({}).fetchAll()).toJSON();
    cacheKeyModels.forEach((cacheKeyModel) => {
      this.databaseTtls[cacheKeyModel.key] = cacheKeyModel.ttl;
    });
  }

  /**
   * Define a key that will be used
   * @param key
   * @param ttl
   */
  public registerKey(key: string, ttl: string): void {
    this.ttls[key] = ttl;
  }

  /**
   * Get the ttl for a cache key
   * @param key
   */
  public getTtlForKey(key: string): string {
    return this.databaseTtls[key] || this.ttls[key];
  }

  /**
   * Set a new ttl for a cache, stores it permanently in the database
   * @param key
   * @param ttl
   */
  public async setTtlForKey(key: string, ttl: string) {
    this.databaseTtls[key] = ttl;
    this.recentlyUpdatedTtls[key] = true;

    let cacheKeyModel = await CacheKeyModel.where({ key }).fetch();

    if (!cacheKeyModel) {
      cacheKeyModel = new CacheKeyModel({
        key,
      });
    }

    cacheKeyModel.set({ ttl });
    return cacheKeyModel.save();
  }

  /**
   * Checks if a ttl was updated since the last cache request
   * @param key
   */
  public ttlWasJustSet(key: string) {
    return !!this.recentlyUpdatedTtls[key];
  }

  /**
   * Clears a ttl from the recently updated dictionary
   * @param key
   */
  public markTtlAsUsed(key: string) {
    delete this.recentlyUpdatedTtls[key];
  }

  /**
   * Clears a database ttl for a cache key
   * @param key
   */
  public async resetTtlForKey(key: string) {
    delete this.databaseTtls[key];
    this.recentlyUpdatedTtls[key] = true;

    const cacheKeyModel = await CacheKeyModel.where({ key }).fetch();

    if (cacheKeyModel) {
      cacheKeyModel.destroy();
    }
  }

  /**
   * Get a list of cache keys and their ttls
   */
  public getKeys() {
    const keys = Object.keys(this.ttls);

    return keys.map((key) => ({
      name: key,
      ttl: this.getTtlForKey(key),
    }));
  }
}

export default new CacheManager;
