import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../Shared/domain/value-object/StringValueObject";

export class UserEmail extends StringValueObject {
  private constructor(email: string) {
    super(email);
  }

  private static ensureEmailIsValid(email: string): void {
    if (this.isInvalidEmail(email)) {
      throw new InvalidArgumentError(`The User Email <${email}> is invalid`);
    }
  }

  private static isInvalidEmail(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }

  public static create(email: string) {
    this.ensureEmailIsValid(email);
    return new UserEmail(email);
  }
}
