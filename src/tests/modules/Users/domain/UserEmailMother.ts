import { UserEmail } from "../../../../modules/Users/domain/UserEmail";
import { EmailMother } from "../../Shared/domain/EmailMother";

export class UserEmailMother {
  static create(value: string): UserEmail {
    return UserEmail.create({ value });
  }

  static random(): UserEmail {
    return this.create(EmailMother.random());
  }
}
