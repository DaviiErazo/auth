import { User } from "../../domain/User";

import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";

type Params = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
};

export class UserCreator {
  constructor () {}
  async run(userProps: Params): Promise<void> {
    const user = User.create(userProps);
    console.log(user);
  }
}
