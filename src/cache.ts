import 'dotenv/config';
import { RedisCacheModel } from './model/RedisCacheModel';
import { CacheInterface } from './model/interface/CacheInterface';

class Cache implements CacheInterface {
  private service: RedisCacheModel;

  constructor() {
    this.service = new RedisCacheModel();
  }

  public async flush(): Promise<void> {
    return this.service.flush();
  }

  public async get(key: string): Promise<string | null> {
    return this.service.get(key);
  }

  public async has(key: string): Promise<boolean> {
    return this.service.has(key);
  }

  public async pull(key: string): Promise<string | null> {
    return this.service.pull(key);
  }

  public async forget(key: string): Promise<void> {
    return this.service.forget(key);
  }

  public async set(key: string, value: string): Promise<void> {
    return this.service.set(key, value);
  }

  public async put(
    key: string,
    value: string,
    seconds?: number,
  ): Promise<void> {
    return this.service.put(key, value, seconds);
  }

  public async remember(
    key: string,
    value: string,
    seconds?: number,
  ): Promise<string> {
    return this.service.remember(key, value, seconds);
  }

  public async rememberForever(key: string, value: string): Promise<string> {
    return this.service.rememberForever(key, value);
  }

  public async forever(key: string, value: string): Promise<void> {
    return this.service.forever(key, value);
  }
}

export default new Cache();
