import { User } from "../../domain/User";

export class UsersResponse {
  readonly users: Array<User>;

  constructor(UsersResponse: Array<User>) {
    this.users = UsersResponse;
  }
}
