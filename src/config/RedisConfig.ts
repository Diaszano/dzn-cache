import Redis from 'ioredis';
import { RedisOptionsInterface } from './interface/RedisOptionsInterface';

const redisOptions: RedisOptionsInterface = {
  port: parseInt(process.env.REDIS_PORT || '6379'),
  host: process.env.REDIS_HOST || '127.0.0.1',
  password: process.env.REDIS_PASSWORD || undefined,
  username: process.env.REDIS_USERNAME || undefined,
  db: parseInt(process.env.REDIS_DATABASE || '0'),
};

const redisClient: Redis = new Redis(redisOptions);

export { redisClient };
