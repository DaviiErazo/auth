import config from '../../../Shared/infrastructure/config';
import IRedisConfig from '../../../../Shared/infrastructure/Services/redis/IRedisConfig';

export class RedisConfig {
  static createConfig(): IRedisConfig {
    return {
      secret: config.get('redis.secret'),
      tokenExpiryTime: config.get('redis.tokenExpiryTime'),
      redisServerPort: config.get('redis.redisServerPort'),
      redisServerURL: config.get('redis.redisServerURL'),
      redisConnectionString: config.get('redis.redisConnectionString')
    };
  }
}