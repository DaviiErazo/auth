var redis = require("redis-mock");

import { UserMother } from "../../domain/UserMother";
import { RefreshAccessTokenCommandMother } from "./RefreshAccessTokencommandMother";
import { RefreshAccessToken } from "../../../../../modules/Users/application/RefreshAccessToken/RefreshAccessToken";
import { RefreshAccessTokenCommandHandler } from "../../../../../modules/Users/application/RefreshAccessToken/RefreshAccessTokenCommandHandler";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import { RedisConfig } from "../../../../../modules/Users/infrastructure/services/Redis/RedisConfig";
import { RedisAuthService } from "../../../../../modules/Users/infrastructure/services/Redis/RedisAuthService";
import { UserNotFound } from "../../../../../modules/Users/domain/UserNotFound";
import { LoginUser } from "../../../../../modules/Users/application/Login/LoginUser";
import { LoginUserCommandHandler } from "../../../../../modules/Users/application/Login/LoginUserCommandHandler";
import { LoginUsercommandMother } from "../Login/LoginUserCommandMother";

let repository: UserRepositoryMock;
let handler: RefreshAccessTokenCommandHandler;
let handlerLogin: LoginUserCommandHandler;
let authService: RedisAuthService;

const redisConfig = RedisConfig.createConfig();
const redisClientMock = redis.createClient();

beforeEach(() => {
  repository = new UserRepositoryMock();
  authService = new RedisAuthService(redisClientMock, redisConfig);
});

describe("UserRefreshAccessToken", () => {
  it("throws an error if a user RefreshAccessToken command that does not exist is handled", async () => {
    let exception;
    const existingUser = UserMother.random();

    const id = existingUser.id.toString();

    const refreshAccessTokenUseCase = new RefreshAccessToken(repository, authService);
    handler = new RefreshAccessTokenCommandHandler(refreshAccessTokenUseCase);

    const command = RefreshAccessTokenCommandMother.create(id);

    try {
      await handler.handle(command);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe(`Username not found for refresh token.`);
  });

  it("should refresh token", async () => {
    const existingUser = UserMother.random();
    const id = existingUser.id.toString();
    const email = existingUser.email.props.value;
    const password = existingUser.password.props.value;

    await repository.save(existingUser);

    const loginUseCase = new LoginUser(repository, authService);
    handlerLogin = new LoginUserCommandHandler(loginUseCase);
    
    const commandLogin = LoginUsercommandMother.create(email, password);
    const response = await handlerLogin.handle(commandLogin);

    const refreshAccessTokenUseCase = new RefreshAccessToken(repository, authService);
    handler = new RefreshAccessTokenCommandHandler(refreshAccessTokenUseCase);

    const command = RefreshAccessTokenCommandMother.create(response.refreshToken);

    const refreshToken = await handler.handle(command);

    expect(typeof response).toBe("object");
    expect(typeof refreshToken).toBe("string");
    expect(typeof response.accessToken).toBe("string");
    expect(typeof response.refreshToken).toBe("string");
  });
});
