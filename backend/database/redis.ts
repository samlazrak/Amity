import config from 'config';
import redis from 'redis';

const url: string = config.get('redis.url');

export default redis.createClient({
  url,
});
