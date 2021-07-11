import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";
import { AggregateRoot } from "../../Shared/domain/AggregateRoot";

type Params = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
};

export class User extends AggregateRoot {
  readonly name: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;

  constructor(userProps: Params) {
    super();
    this.name = userProps.name;
    this.email = userProps.email;
    this.password = userProps.password;
  }

  static create(userProps: Params): User {
    const user = new User(userProps);

    return user;
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string; password: string }): User {
    return new User({
      name: new UserName(plainData.name),
      email: new UserEmail(plainData.email),
      password: new UserPassword(plainData.password),
    });
  }

  toPrimitives() {
    return {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
