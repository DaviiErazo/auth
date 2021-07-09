import { Command } from "../../../Shared/domain/Command";

type Params = {
  id: string;
  name: string;
  password: string;
  email: string;
};

export class CreateUserCommand extends Command {
  id: string;
  name: string;
  password: string;
  email: string;

  constructor({ id, name, password, email }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
