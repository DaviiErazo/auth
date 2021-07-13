import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";

export interface RecipientEmailProps {
  value: string;
}

export class RecipientEmail extends ValueObject<RecipientEmailProps> {
  private constructor(props: RecipientEmailProps) {
    super(props);
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

  public static create(props: RecipientEmailProps) {
    this.ensureEmailIsValid(props.value);
    return new RecipientEmail(props);
  }
}
