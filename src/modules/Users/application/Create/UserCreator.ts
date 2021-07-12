import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";

type Params = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
};

export class UserCreator {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(userProps: Params): Promise<void> {
    await this.repository.exists(userProps.email.props.value);
    const user = User.create(userProps);
    await this.repository.save(user);
  }
}
