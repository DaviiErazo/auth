import { CreateUserCommand } from "./CreateUserCommand";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";
import { UserCreator } from "./UserCreator";

import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserEmail } from "../../domain/UserEmail";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private userCreator: UserCreator) {}

  subscribedTo(): String {
    return CreateUserCommand.name;
  }

  async handle(command: CreateUserCommand): Promise<void> {
    const name = UserName.create(command.name);
    const password = UserPassword.create(command.password, true);
    const email = UserEmail.create(command.email);

    await this.userCreator.run({
      name,
      password,
      email,
    });
  }
}
