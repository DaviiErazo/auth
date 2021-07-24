import { DeleteUserCommand } from "../../../../../modules/Users/application/Delete/DeleteUserCommand";
import { UserIdMother } from "../../domain/UserIdMother";

export class DeleteUserCommandMother {
  static create(id: string) {
    return new DeleteUserCommand(id);
  }

  static random(): DeleteUserCommand {
    return this.create(UserIdMother.random().id.toString());
  }
}
