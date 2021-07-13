import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { AuthService } from "../../infrastructure/Services/Redis/AuthService";

export class LogoutUser {
  private repository: UserRepository;
  private authService: AuthService;

  constructor(repository: UserRepository, authService: AuthService) {
    this.repository = repository;
    this.authService = authService;
  }

  async run(id: string): Promise<void> {
    let user: User;
    user = await this.repository.getUserById(id);
    await this.authService.deAuthenticateUser(user.username.props.value);
  }
}
