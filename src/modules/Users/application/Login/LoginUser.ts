import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { AuthService } from "../../infrastructure/Services/Redis/AuthService";
import { JWTToken } from "../../domain/jwt";
import { PasswordDoesntMatchError } from "../../domain/PasswordDoesntMatchError";

type LoginUserProps = {
  email: UserEmail;
  password: UserPassword;
};

export class LoginUser {
  private repository: UserRepository;
  private authService: AuthService;

  constructor(repository: UserRepository, authService: AuthService) {
    this.repository = repository;
    this.authService = authService;
  }

  async run({ email, password }: LoginUserProps): Promise<string> {
    let user: User;

    user = await this.repository.getUserByEmail(email.props.value);
    const passwordValid = await user.password.comparePassword(password.props.value);

    if (!passwordValid) {
      throw new PasswordDoesntMatchError();
    }

    const accessToken: JWTToken = this.authService.signJWT({
      username: user.username.props.value,
      email: user.email.props.value,
      userId: user.userId.id.toString(),
    });

    return accessToken;
  }
}
