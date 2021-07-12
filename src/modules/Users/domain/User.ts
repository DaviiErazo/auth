import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";
import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";
import { UserId } from "./userId";

type UserProps = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
};

export class User extends AggregateRoot<UserProps> {
  get userId (): UserId {
    return UserId.create(this._id)
  }

  get name(): UserName {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  private constructor(userProps: UserProps, id?: UniqueEntityID) {
    super(userProps, id);
  }

  static create(userProps: UserProps, id?: UniqueEntityID): User {
    const user = new User(userProps, id);
    return user;
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string; password: string }): User {
    return User.create(
      {
        name: UserName.create({ value: plainData.name }),
        email: UserEmail.create({ value: plainData.email }),
        password: UserPassword.create({ value: plainData.password }),
      },
      new UniqueEntityID(plainData.id)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.props.value,
      email: this.email.props.value,
      password: this.password.props.value,
    };
  }
}
