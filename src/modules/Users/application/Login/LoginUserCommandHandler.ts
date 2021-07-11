import { LoginUser } from "./LoginUser";
import { LoginUserCommand } from "./LoginUserCommand";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";

export class LoginUserCommandHandler implements CommandHandler<LoginUserCommand> {
  constructor(private loginUser: LoginUser) {}

  subscribedTo(): String {
    return LoginUserCommand.name;
  }

  async handle(command: LoginUserCommand): Promise<void> {
    const password = UserPassword.create(command.password, true);
    const email = UserEmail.create(command.email);

    await this.loginUser.run({ password, email });
  }
}
