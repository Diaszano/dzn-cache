import { Cache as CacheInterface } from './Model/Interface/Cache';
import RedisOptions, {
  RedisOptionsDefault,
} from './Model/Redis/Interface/RedisOptions';
import { CacheRedis } from './Model/Redis/Cache.redis';

export { RedisOptions };

export default class Cache implements CacheInterface {
  private cacheDriver: CacheRedis;

  constructor(public readonly options: RedisOptions = RedisOptionsDefault) {
    this.cacheDriver = new CacheRedis(options);
  }

  public async flush(): Promise<void> {
    await this.cacheDriver.flush();
  }

  public async get(key: string): Promise<string | null> {
    return this.cacheDriver.get(key);
  }

  public async has(key: string): Promise<boolean> {
    return this.cacheDriver.has(key);
  }

  public async pull(key: string): Promise<string | null> {
    return this.cacheDriver.pull(key);
  }

  public async forget(key: string): Promise<void> {
    return this.cacheDriver.forget(key);
  }

  public async set(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void> {
    await this.cacheDriver.set(key, value, seconds);
  }

  public async add(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void> {
    await this.cacheDriver.add(key, value, seconds);
  }

  public async forever(
    key: string,
    value: string | (() => string),
  ): Promise<void> {
    await this.cacheDriver.forever(key, value);
  }

  public async rememberForever(
    key: string,
    value: string | (() => string),
  ): Promise<string> {
    return this.cacheDriver.rememberForever(key, value);
  }

  public async remember(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<string> {
    return this.cacheDriver.remember(key, value, seconds);
  }
}
