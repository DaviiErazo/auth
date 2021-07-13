import { LoginUser } from "./LoginUser";
import { LoginUserCommand } from "./LoginUserCommand";
import LoginResponse from "./LoginResponse";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";

export class LoginUserCommandHandler implements CommandHandler<LoginUserCommand> {
  constructor(private loginUser: LoginUser) {}

  subscribedTo(): String {
    return LoginUserCommand.name;
  }

  async handle(command: LoginUserCommand): Promise<LoginResponse> {
    const password = UserPassword.create({ value: command.password });
    const email = UserEmail.create({ value: command.email });

    const loginResponse = await this.loginUser.run({ password, email });
    return loginResponse;
  }
}
