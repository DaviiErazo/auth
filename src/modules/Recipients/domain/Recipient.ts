import { RecipientName } from "./RecipientName";
import { RecipientEmail } from "./RecipientEmail";
import { AccountBank } from "./AccountBank";
import { RecipientId } from "./RecipientId";
import { AccountType } from "./AccountType";

import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";
// import { UserCreatedDomainEvent } from "./UserCreatedDomainEvent";

type UserProps = {
  userId: string;
  name: RecipientName;
  email: RecipientEmail;
  accountNumber: Number;
  accountBank: AccountBank;
  accountType: AccountType;
  isDeleted?: boolean;
};

export class Recipient extends AggregateRoot<UserProps> {
  get recipientId(): RecipientId {
    return RecipientId.create(this._id);
  }

  get userId(): string {
    return this.props.userId;
  }

  get name(): RecipientName {
    return this.props.name;
  }

  get email(): RecipientEmail {
    return this.props.email;
  }

  get accountNumber(): Number {
    return this.props.accountNumber;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get accountBank(): AccountBank {
    return this.props.accountBank;
  }

  get accountType(): AccountType {
    return this.props.accountType;
  }

  private constructor(userProps: UserProps, id?: UniqueEntityID) {
    super(userProps, id);
  }

  static create(userProps: UserProps, id?: UniqueEntityID): Recipient {
    const user = new Recipient(userProps, id);
    const isNewUser = !!id === false;

    /*
    if (isNewUser) {
      user.record(
        new UserCreatedDomainEvent({
          id: user.id.toString(),
          username: user.username.props.value,
          email: user.username.props.value,
        })
      );
    }
    */
    return user;
  }

  static fromPrimitives(plainData: {
    userId: string;
    id: string;
    name: string;
    email: string;
    accountBank: string;
    accountType: string;
    accountNumber: Number;
  }): Recipient {
    return Recipient.create(
      {
        userId: plainData.userId,
        name: RecipientName.create({ value: plainData.name }),
        email: RecipientEmail.create({ value: plainData.email }),
        accountBank: AccountBank.create({ value: plainData.accountBank }),
        accountType: AccountType.create({ value: plainData.accountType }),
        accountNumber: plainData.accountNumber,
      },
      new UniqueEntityID(plainData.id)
    );
  }

  toPrimitives() {
    return {
      userId: this.userId,
      id: this.id.toString(),
      name: this.name.props.value,
      email: this.email.props.value,
      accountBank: this.accountBank.props.value,
      accountType: this.accountType.props.value,
      accountNumber: this.accountNumber,
    };
  }
}
