import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";

interface RecipientNameProps {
  value: string;
}
export class RecipientName extends ValueObject<RecipientNameProps> {
  private constructor(props: RecipientNameProps) {
    super(props);
  }

  private static ensureLengthIsLessThan30Characters(name: string): void {
    if (name.length > 30) {
      throw new InvalidArgumentError(`The User Name <${name}> has more than 30 characters`);
    }
  }

  public static create(props: RecipientNameProps) {
    this.ensureLengthIsLessThan30Characters(props.value);
    return new RecipientName(props);
  }
}
