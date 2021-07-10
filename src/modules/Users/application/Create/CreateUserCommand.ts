import { Command } from "../../../Shared/domain/Command";

type Params = {
  name: string;
  password: string;
  email: string;
};

export class CreateUserCommand extends Command {
  name: string;
  password: string;
  email: string;

  constructor({ name, password, email }: Params) {
    super();
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
