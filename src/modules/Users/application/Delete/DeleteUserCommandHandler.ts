import { DeleteUserCommand } from "./DeleteUserCommand";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";
import { DeleteUser } from "./DeleteUser";

export class DeleteUserCommandHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private userCreator: DeleteUser) {}

  subscribedTo(): String {
    return DeleteUserCommand.name;
  }

  async handle(command: DeleteUserCommand): Promise<void> {
    const userId = command.id;
    
    await this.userCreator.run(userId);
  }
}
