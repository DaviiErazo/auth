import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../Shared/domain/value-object/StringValueObject";

export class UserName extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  private static ensureLengthIsLessThan30Characters(name: string): void {
    if (name.length > 30) {
      throw new InvalidArgumentError(`The User Name <${name}> has more than 30 characters`);
    }
  }

  public static create(name: string) {
    this.ensureLengthIsLessThan30Characters(name);
    return new UserName(name);
  }
}
