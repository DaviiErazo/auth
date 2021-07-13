import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";

interface AccountBankProps {
  value: string;
}
export class AccountBank extends ValueObject<AccountBankProps> {
  private constructor(props: AccountBankProps) {
    super(props);
  }

  private static ensureLengthIsLessThan30Characters(name: string): void {
    if (name.length > 30) {
      throw new InvalidArgumentError(`The User Name <${name}> has more than 30 characters`);
    }
  }

  public static create(props: AccountBankProps) {
    this.ensureLengthIsLessThan30Characters(props.value);
    return new AccountBank(props);
  }
}
