import { LogoutUser } from "./LogoutUser";
import { LogoutUserCommand } from "./LogoutUserCommand";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";

export class LogoutUserCommandHandler implements CommandHandler<LogoutUserCommand> {
  constructor(private logoutUser: LogoutUser) {}

  subscribedTo(): String {
    return LogoutUserCommand.name;
  }

  async handle(command: LogoutUserCommand): Promise<void> {
    const id = command.id;
    await this.logoutUser.run(id);
  }
}
