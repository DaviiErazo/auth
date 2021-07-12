import { Command } from "../../../Shared/domain/Command";

type CreateUserCommandProps = {
  name: string;
  password: string;
  email: string;
};

export class CreateUserCommand extends Command {
  name: string;
  password: string;
  email: string;

  constructor({ name, password, email }: CreateUserCommandProps) {
    super();
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
