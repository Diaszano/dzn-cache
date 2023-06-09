import { RedisOptions as RedisOptionsIoredis } from 'ioredis';

export default interface RedisOptions extends RedisOptionsIoredis {
  port: number;
  host: string;
  username?: string;
  password?: string;
  db: number;
  retryStrategy?: (times: number) => number;
  maxRetriesPerRequest?: number;
}

export const RedisOptionsDefault: RedisOptions = {
  port: 6379,
  host: '127.0.0.1',
  db: 0,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 3,
};
