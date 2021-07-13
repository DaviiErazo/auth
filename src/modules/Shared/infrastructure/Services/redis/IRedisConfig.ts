interface IRedisConfig {
  secret: string;
  tokenExpiryTime: number;
  redisServerPort: number;
  redisServerURL: string;
  redisConnectionString: string;
};

export default IRedisConfig;
