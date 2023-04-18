import { createPool, Factory, Pool } from 'generic-pool';
import Redis from 'ioredis';
import { RedisOptionsInterface } from './interface/RedisOptionsInterface';

const redisOptions: RedisOptionsInterface = {
  port: parseInt(process.env.CACHE_REDIS_PORT || '6379'),
  host: process.env.CACHE_REDIS_HOST || '127.0.0.1',
  password: process.env.CACHE_REDIS_PASSWORD || undefined,
  username: process.env.CACHE_REDIS_USERNAME || undefined,
  db: parseInt(process.env.CACHE_REDIS_DATABASE || '0'),
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 3,
};

const createRedisClient = async (): Promise<Redis> => {
  return new Redis(redisOptions);
};

const redisFactory: Factory<Redis> = {
  create: async (): Promise<Redis> => await createRedisClient(),
  destroy: async (client: Redis): Promise<void> => {
    await client.quit();
  },
};

const redisPool: Pool<Redis> = createPool(redisFactory, { min: 1, max: 10 });

export { redisPool };
