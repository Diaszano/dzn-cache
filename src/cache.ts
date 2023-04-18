import 'dotenv/config';
import { RedisCacheModel } from './model/RedisCacheModel';

if (process.env.CACHE_DRIVER == 'redis') {
  const Cache = new RedisCacheModel();
} else {
  const Cache = null;
}

export { Cache };
