import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";

type Params = {
  email: UserEmail;
  password: UserPassword;
};

export class LoginUser {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({ email, password }: Params): Promise<void> {
    let user: User;
    user = await this.repository.getUserByEmail(email.props.value);

    console.log(await password.comparePassword(user.props.password.props.value))
  }
}
