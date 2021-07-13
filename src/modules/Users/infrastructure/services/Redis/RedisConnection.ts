import redis, { RedisClient } from "redis";
import IRedisConfig from "../../../../Shared/infrastructure/Services/redis/IRedisConfig";

const isProduction = process.env.NODE_ENV === "prod";

export class RedisConnection {
  static createClient(redisConfig: IRedisConfig): RedisClient {
    const port = redisConfig.redisServerPort;
    const host = redisConfig.redisServerURL;
    const redisConnection: RedisClient = isProduction
      ? redis.createClient(redisConfig.redisConnectionString)
      : redis.createClient(port, host); // creates a new client

    redisConnection.on("connect", () => {
      console.log(`[Redis]: Connected to redis server at ${host}:${port}`);
    });

    return redisConnection;
  }
}
