import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";

export interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  private constructor(props: UserEmailProps) {
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

  public static create(props: UserEmailProps) {
    this.againstNullOrUndefined('Email', props.value)
    this.ensureEmailIsValid(props.value);
    return new UserEmail(props);
  }
}
