import Redis, { ChainableCommander } from 'ioredis';
import { CacheInterface } from './interface/CacheInterface';
import { redisPool } from '../config/RedisConfig';
import { Pool } from 'generic-pool';

class RedisCacheModel implements CacheInterface {
  private redisPool: Pool<Redis>;

  constructor() {
    this.redisPool = redisPool;
  }

  public async flush(): Promise<void> {
    await this.redisPool.use((client: Redis) => client.flushall());
  }

  public async get(key: string): Promise<string | null> {
    return this.redisPool.use((client: Redis) => client.get(key));
  }

  public async has(key: string): Promise<boolean> {
    const value: string | null = await this.get(key);
    return value !== null;
  }

  public async pull(key: string): Promise<string | null> {
    const value: string | null = await this.get(key);
    if (value !== null) {
      await this.forget(key);
    }
    return value;
  }

  public async forget(key: string): Promise<void> {
    await this.redisPool.use((client: Redis) => client.del(key));
  }

  public async set(key: string, value: string): Promise<void> {
    await this.redisPool.use((client: Redis) => client.set(key, value));
  }

  public async put(
    key: string,
    value: string,
    seconds?: number,
  ): Promise<void> {
    const redisClient: Redis = await this.redisPool.acquire();
    const pipeline: ChainableCommander = redisClient.pipeline();

    pipeline.set(key, value);

    if (seconds !== undefined) {
      pipeline.expire(key, seconds);
    }

    await pipeline.exec();

    return this.redisPool.release(redisClient);
  }

  public async remember(
    key: string,
    value: string,
    seconds?: number,
  ): Promise<string> {
    const cachedValue: string | null = await this.get(key);
    if (cachedValue !== null) {
      return cachedValue;
    }
    await this.put(key, value, seconds);
    return value;
  }

  public async rememberForever(key: string, value: string): Promise<string> {
    const cachedValue: string | null = await this.get(key);
    if (cachedValue !== null) {
      return cachedValue;
    }
    await this.set(key, value);
    return value;
  }

  public async forever(key: string, value: string): Promise<void> {
    await this.set(key, value);
  }
}

export { RedisCacheModel };
