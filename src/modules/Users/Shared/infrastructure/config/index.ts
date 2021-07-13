import convict from "convict";

const userConfig = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "staging", "test"],
    default: "default",
    env: "NODE_ENV",
  },
  mongo: {
    url: {
      doc: "The Mongo connection URL",
      format: String,
      env: "MONGO_URL",
      default: "mongodb://localhost:27017/Bank",
    },
  },
  redis: {
    secret: {
      doc: "The redis app secret",
      format: String,
      env: "BANK_REDIS_APP_SECRET",
      default: "default",
    },
    tokenExpiryTime: {
      doc: "Token expiry time",
      format: Number,
      default: 300,
    },
    redisServerPort: {
      doc: "Redis server port",
      format: String,
      env: "BANK_REDIS_PORT",
      default: 6379,
    },
    redisServerURL: {
      doc: "Redis server url",
      format: String,
      env: "BANK_REDIS_URL",
      default: "localhost",
    },
    redisConnectionString: {
      doc: "Redis connection string",
      format: String,
      env: "BANK_REDIS_URL",
      default: "default",
    },
  },
});

export default userConfig;
