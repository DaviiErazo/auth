import { UserPassword } from "../../../../modules/Users/domain/UserPassword";
import { PasswordMother } from "../../Shared/domain/PasswordMother";

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return UserPassword.create({ value });
  }

  static random(): UserPassword {
    return this.create(PasswordMother.random());
  }
}
