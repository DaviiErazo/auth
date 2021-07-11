import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../Shared/domain/value-object/StringValueObject";

export class UserPassword extends StringValueObject {
  public minLength: number = 6;

  constructor(password: string) {
    super(password);
    this.isAppropriateLength(password);
  }

  private isAppropriateLength(password: string): void {
    if (password.length < this.minLength) {
      throw new InvalidArgumentError(`The User Name <${password}> has less than ${this.minLength} characters`);
    }
  }
}
