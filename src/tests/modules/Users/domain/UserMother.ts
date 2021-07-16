import { CreateUserCommand } from "../../../../modules/Users/application/Create/CreateUSerCommand";
import { User } from "../../../../modules/Users/domain/User";
import { UserEmail } from "../../../../modules/Users/domain/UserEmail";
import { UserName } from "../../../../modules/Users/domain/UserName";
import { UserPassword } from "../../../../modules/Users/domain/UserPassword";
import { UserEmailMother } from "./UserEmailMother";
import { UserNameMother } from "./UserNameMother";
import { UserPasswordMother } from "./UserPasswordMother";

export class UserMother {
  static create(username: UserName, password: UserPassword, email: UserEmail): User {
    return User.create({ username, password, email });
  }

  static fromCommand(command: CreateUserCommand): User {
    return this.create(
      UserNameMother.create(command.username),
      UserPasswordMother.create(command.password),
      UserEmailMother.create(command.email)
    );
  }

  static random(): User {
    return this.create(UserNameMother.random(), UserPasswordMother.random(), UserEmailMother.random());
  }
}
