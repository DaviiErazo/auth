import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";
import { UserId } from "./userId";
import { JWTToken, RefreshToken } from "./jwt";

import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";
import { UserCreatedDomainEvent } from "./UserCreatedDomainEvent";

type UserProps = {
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
};

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id);
  }

  get username(): UserName {
    return this.props.username;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get refreshToken(): RefreshToken {
    return this.props.refreshToken;
  }

  get lastLogin(): Date {
    return this.props.lastLogin;
  }

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      this.props.isDeleted = true;
    }
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  private constructor(userProps: UserProps, id?: UniqueEntityID) {
    super(userProps, id);
  }

  static create(userProps: UserProps, id?: UniqueEntityID): User {
    const user = new User(userProps, id);
    const isNewUser = !!id === false;

    if (isNewUser) {
      user.record(
        new UserCreatedDomainEvent({
          id: user.id.toString(),
          username: user.username.props.value,
          email: user.username.props.value,
        })
      );
    }
    return user;
  }

  static fromPrimitives(plainData: { id: string; username: string; email: string; password: string }): User {
    return User.create(
      {
        username: UserName.create({ value: plainData.username }),
        email: UserEmail.create({ value: plainData.email }),
        password: UserPassword.create({ value: plainData.password }),
      },
      new UniqueEntityID(plainData.id)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      username: this.username.props.value,
      email: this.email.props.value,
      password: this.password.props.value,
      isDeleted: this.isDeleted,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      lastLogin: this.lastLogin,
    };
  }
}
