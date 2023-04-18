import { RedisOptions } from 'ioredis';

interface RedisOptionsInterface extends RedisOptions {
  username?: string;
}

export { RedisOptionsInterface };
