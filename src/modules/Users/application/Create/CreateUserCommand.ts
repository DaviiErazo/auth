import { Command } from "../../../Shared/domain/Command";

type CreateUserCommandProps = {
  username: string;
  password: string;
  email: string;
};

export class CreateUserCommand extends Command {
  username: string;
  password: string;
  email: string;

  constructor({ username, password, email }: CreateUserCommandProps) {
    super();
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
