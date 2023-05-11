import Redis, { ChainableCommander } from 'ioredis';
import { CacheInterface } from './interface/CacheInterface';
import { Pool } from 'generic-pool';
import { redisPool as redisConnection } from '../config/RedisConfig';

class RedisCacheModel implements CacheInterface {
  constructor(private readonly redisPool: Pool<Redis> = redisConnection) {}

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

  public async set(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void> {
    await this.put(key, value, seconds);
  }

  public async put(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void> {
    const redisClient: Redis = await this.redisPool.acquire();
    const pipeline: ChainableCommander = redisClient.pipeline();

    let valueToStore: string;

    if (typeof value === 'string') {
      valueToStore = value;
    } else {
      valueToStore = value();
    }

    pipeline.set(key, valueToStore);

    if (seconds !== undefined && seconds > 0) {
      pipeline.expire(key, seconds);
    }

    await pipeline.exec();
    await this.redisPool.release(redisClient);
  }

  public async forever(
    key: string,
    value: string | (() => string),
  ): Promise<void> {
    await this.put(key, value);
  }

  public async rememberForever(
    key: string,
    value: string | (() => string),
  ): Promise<string> {
    return this.remember(key, value);
  }

  public async remember(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<string> {
    const cachedValue: string | null = await this.get(key);

    if (cachedValue !== null) {
      return cachedValue;
    }

    let valueToStore: string;

    if (typeof value === 'string') {
      valueToStore = value;
    } else {
      valueToStore = value();
    }

    await this.put(key, valueToStore, seconds);

    return valueToStore;
  }
}

export { RedisCacheModel };
