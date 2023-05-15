import RedisOptions, { RedisOptionsDefault } from './Interface/RedisOptions';
import Redis, { ChainableCommander } from 'ioredis';
import { createPool, Factory, Pool } from 'generic-pool';
import { Cache as CacheInterface } from '../Interface/Cache';

export class CacheRedis implements CacheInterface {
  private readonly redisFactory: Factory<Redis> = {
    create: async (): Promise<Redis> => await this.createRedisClient(),
    destroy: async (client: Redis): Promise<void> => {
      await client.quit();
    },
  };

  private readonly redisPool: Pool<Redis> = createPool(this.redisFactory, {
    min: 1,
    max: 10,
  });

  constructor(private readonly options: RedisOptions = RedisOptionsDefault) {}

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

  public async add(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void> {
    if (await this.has(key)) {
      return;
    }
    await this.set(key, value, seconds);
  }

  public async forever(
    key: string,
    value: string | (() => string),
  ): Promise<void> {
    await this.set(key, value);
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

    await this.set(key, valueToStore, seconds);

    return valueToStore;
  }

  private async createRedisClient(): Promise<Redis> {
    return new Redis(this.options);
  }
}
