import 'dotenv/config';
import { redisClient } from './config/RedisConfig';

redisClient.set('oi', 'redis');

async function getValueFromRedis(key: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function main() {
  try {
    const value = await getValueFromRedis('oi');
    console.log(value);
  } catch (err) {
    console.error(err);
  }
}

main();
