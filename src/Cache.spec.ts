import 'dotenv/config';
import { describe, expect, it } from 'vitest';
import Cache from './Cache';

function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    result += characters.charAt(index);
  }

  return result;
}

describe('Cache Master', async (): Promise<void> => {
  /**
   * Para esse teste é necessário que o Redis tenha senha
   * */
  it('Testando o has', async (): Promise<void> => {
    const cache = new Cache({
      port: parseInt(process.env.CACHE_REDIS_PORT || '6379'),
      host: process.env.CACHE_REDIS_HOST || '127.0.0.1',
      password: process.env.CACHE_REDIS_PASSWORD,
      db: parseInt(process.env.CACHE_REDIS_DATABASE || '0'),
      retryStrategy: (times: number) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    });

    const key: string = generateRandomString(16);

    expect(cache.has(key)).resolves.toBe(false);

    await cache.set(key, 'oi');

    expect(cache.has(key)).resolves.toBe(true);

    await cache.forget(key);
  });
});
