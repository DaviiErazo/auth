import { User } from "../../domain/User";
import { JWTToken } from "../../domain/jwt";
import { UserRepository } from "../../domain/UserRepository";
import { AuthService } from "../../infrastructure/Services/Redis/AuthService";

export class RefreshAccessToken {
  private repository: UserRepository;
  private authService: AuthService;

  constructor(repository: UserRepository, authService: AuthService) {
    this.repository = repository;
    this.authService = authService;
  }

  async run(refreshToken: string): Promise<JWTToken> {
    let user: User;
    let username: string;

    username = await this.authService.getUserNameFromRefreshToken(refreshToken);
    user = await this.repository.getUserByUserName(username);

    const accessToken: JWTToken = this.authService.signJWT({
      username: user.username.props.value,
      email: user.email.props.value,
      userId: user.userId.id.toString(),
    });

    user.setAccessToken(accessToken, refreshToken);
    await this.authService.saveAuthenticatedUser(user);

    return accessToken;
  }
}
