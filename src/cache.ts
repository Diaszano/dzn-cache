import 'dotenv/config';
import { CacheInterface } from './model/interface/CacheInterface';
import { RedisCacheModel } from './model/RedisCacheModel';

class Cache implements CacheInterface {
  private cacheDriver: RedisCacheModel;

  constructor() {
    this.cacheDriver = new RedisCacheModel();
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

  public async put(
    key: string,
    value: string | (() => string),
    seconds?: number,
  ): Promise<void> {
    await this.cacheDriver.put(key, value, seconds);
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

export { Cache };
