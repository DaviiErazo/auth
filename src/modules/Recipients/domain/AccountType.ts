import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";

interface AccountTypeProps {
  value: string;
}
export class AccountType extends ValueObject<AccountTypeProps> {
  private constructor(props: AccountTypeProps) {
    super(props);
  }

  private static ensureLengthIsLessThan30Characters(name: string): void {
    if (name.length > 30) {
      throw new InvalidArgumentError(`The User Name <${name}> has more than 30 characters`);
    }
  }

  public static create(props: AccountTypeProps) {
    this.ensureLengthIsLessThan30Characters(props.value);
    return new AccountType(props);
  }
}
