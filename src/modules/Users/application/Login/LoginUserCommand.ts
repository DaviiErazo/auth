import { Command } from "../../../Shared/domain/Command";

export class LoginUserCommand extends Command {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    super();
    this.password = password;
    this.email = email;
  }
}
