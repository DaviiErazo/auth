import { CreateUserCommand } from "../../../../modules/Users/application/Create/CreateUSerCommand";
import { UserEmailMother } from "../domain/UserEmailMother";
import { UserNameMother } from "../domain/UserNameMother";
import { UserPasswordMother } from "../domain/UserPasswordMother";

export class CreateUserCommandMother {
  static create(username: string, password: string, email: string) {
    return new CreateUserCommand({ username, password, email });
  }

  static random(): CreateUserCommand {
    return this.create(
      UserNameMother.random().props.value,
      UserPasswordMother.random().props.value,
      UserEmailMother.random().props.value
    );
  }
}
