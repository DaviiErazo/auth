import { LogoutUserCommand } from "../../../../../modules/Users/application/Logout/LogoutUserCommand";
import { UserIdMother } from "../../domain/UserIdMother";

export class LogoutUserCommandMother {
  static create(id: string): LogoutUserCommand {
    return new LogoutUserCommand(id);
  }

  static random(): LogoutUserCommand {
    return this.create(UserIdMother.random().id.toString());
  }
}
