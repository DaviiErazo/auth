import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { UserAlreadyExists } from "../../domain/UserAlreadyExists";

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
    await this.verifyUserAlreadyExist(userProps.email.value);
    
    const user = User.create(userProps);
    await this.repository.save(user);
  }

  private async verifyUserAlreadyExist(email: string): Promise<void> {
    const user = await this.repository.exists(email);
    if (user) {
      throw new UserAlreadyExists(email);
    }
  }
}
