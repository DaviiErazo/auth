var redis = require("redis-mock");

import { UserMother } from "../../domain/UserMother";
import { LogoutUserCommandMother } from "./LogoutUserCommandMother";
import { LogoutUser } from "../../../../../modules/Users/application/Logout/LogoutUser";
import { LogoutUserCommandHandler } from "../../../../../modules/Users/application/Logout/LogoutUserCommandHandler";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { RedisConfig } from "../../../../../modules/Users/infrastructure/services/Redis/RedisConfig";
import { RedisAuthService } from "../../../../../modules/Users/infrastructure/services/Redis/RedisAuthService";
import { UserNotFound } from "../../../../../modules/Users/domain/UserNotFound";

let repository: UserRepositoryMock;
let handler: LogoutUserCommandHandler;
let authService: RedisAuthService;

const redisConfig = RedisConfig.createConfig();
const redisClientMock = redis.createClient();

beforeEach(() => {
  repository = new UserRepositoryMock();
  authService = new RedisAuthService(redisClientMock, redisConfig);
});

describe("UserLogout", () => {
  it("throws an error if a user logout command that does not exist is handled", async () => {
    let exception;
    const existingUser = UserMother.random();

    const id = existingUser.id.toString();

    const logoutUseCase = new LogoutUser(repository, authService);
    handler = new LogoutUserCommandHandler(logoutUseCase);

    const command = LogoutUserCommandMother.create(id);

    try {
      await handler.handle(command);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(UserNotFound);
    expect(exception.message).toBe(`User ${id} not found`);
  });

  it("should logout a user", async () => {
    const existingUser = UserMother.random();

    const id = existingUser.id.toString();

    repository.save(existingUser);

    const logoutUseCase = new LogoutUser(repository, authService);
    handler = new LogoutUserCommandHandler(logoutUseCase);

    const command = LogoutUserCommandMother.create(id);
    await handler.handle(command);
  });
});
