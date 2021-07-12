import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";

interface UserNameProps {
  value: string;
}
export class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props);
  }

  private static ensureLengthIsLessThan30Characters(name: string): void {
    if (name.length > 30) {
      throw new InvalidArgumentError(`The User Name <${name}> has more than 30 characters`);
    }
  }

  public static create(props: UserNameProps) {
    this.ensureLengthIsLessThan30Characters(props.value);
    return new UserName(props);
  }
}
