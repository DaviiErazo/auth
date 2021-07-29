import { LoginUserCommand } from "../../../../../modules/Users/application/Login/LoginUserCommand";
import { UserEmailMother } from "../../domain/UserEmailMother";
import { UserPasswordMother } from "../../domain/UserPasswordMother";

export class LoginUsercommandMother {
  static create(email: string, password: string): LoginUserCommand {
    return new LoginUserCommand(email, password);
  }

  static random(): LoginUserCommand {
    return this.create(UserEmailMother.random().props.value, UserPasswordMother.random().props.value);
  }
}
