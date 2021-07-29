var redis = require("redis-mock");

import { UserMother } from "../../domain/UserMother";
import { PasswordMother } from "../../../Shared/domain/PasswordMother";
import { LoginUsercommandMother } from "./LoginUserCommandMother";
import { LoginUser } from "../../../../../modules/Users/application/Login/LoginUser";
import { LoginUserCommandHandler } from "../../../../../modules/Users/application/Login/LoginUserCommandHandler";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { RedisConfig } from "../../../../../modules/Users/infrastructure/services/Redis/RedisConfig";
import { RedisAuthService } from "../../../../../modules/Users/infrastructure/services/Redis/RedisAuthService";
import { PasswordDoesntMatchError } from "../../../../../modules/Users/domain/PasswordDoesntMatchError";
import { UserNotFound } from "../../../../../modules/Users/domain/UserNotFound";

let repository: UserRepositoryMock;
let handler: LoginUserCommandHandler;
let authService: RedisAuthService;

const redisConfig = RedisConfig.createConfig();
const redisClientMock = redis.createClient();

beforeEach(() => {
  repository = new UserRepositoryMock();
  authService = new RedisAuthService(redisClientMock, redisConfig);
});

describe("UserLogin", () => {
  it("should return access token and refresh token for an user", async () => {
    const existingUser = UserMother.random();

    const email = existingUser.email.props.value;
    const password = existingUser.password.props.value;

    await repository.save(existingUser);

    const loginUseCase = new LoginUser(repository, authService);
    handler = new LoginUserCommandHandler(loginUseCase);

    const command = LoginUsercommandMother.create(email, password);
    const response = await handler.handle(command);

    expect(typeof response).toBe("object");
    expect(typeof response.accessToken).toBe("string");
    expect(typeof response.refreshToken).toBe("string");
  });

  it("throws an error if a user login command that does not exist is handled", async () => {
    let exception;
    const existingUser = UserMother.random();

    const email = existingUser.email.props.value;
    const password = existingUser.password.props.value;

    const loginUseCase = new LoginUser(repository, authService);
    handler = new LoginUserCommandHandler(loginUseCase);

    const command = LoginUsercommandMother.create(email, password);

    try {
      await handler.handle(command);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(UserNotFound);
    expect(exception.message).toBe(`User ${email} not found`);
  });

  it("throws an error if a user login command is handled that the password does not match", async () => {
    let exception;
    const existingUser = UserMother.random();

    const email = existingUser.email.props.value;
    const password = PasswordMother.random();

    await repository.save(existingUser);

    const loginUseCase = new LoginUser(repository, authService);
    handler = new LoginUserCommandHandler(loginUseCase);

    const command = LoginUsercommandMother.create(email, password);

    try {
      await handler.handle(command);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(PasswordDoesntMatchError);
    expect(exception.message).toBe("Password doesnt match error.");
  });
});
