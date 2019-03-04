import { RedisClient } from 'redis';
import config from 'config';
import ms from 'ms';
import redis from '../database/redis';

const url: string = config.get('redis.url');

class Cache {
  private client: RedisClient;

  constructor(client: RedisClient) {
    this.client = client;
  }

  public async get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err: Error|null, data: any) => {
        err ? reject(err) : resolve(data);
      });
    });
  }

  public async getJSON(key: string): Promise<any> {
    const data = await this.get(key);
    return data ? JSON.parse(data) : data;
  }

  public async set(key: string, data: string, exp?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const done = (err: Error|null) => {
        err ? reject(err) : resolve();
      };

      if (exp) {
        this.client.set(key, data, 'PX', ms(exp), done);
      } else {
        this.client.set(key, data, done);
      }
    });
  }

  public async setJSON(key: string, data: any, exp?:string): Promise<any> {
    const dataString = JSON.stringify(data);
    return this.set(key, dataString, exp);
  }
}

export default new Cache(redis);
