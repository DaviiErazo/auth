import { Command } from "../../../Shared/domain/Command";

type CreateRecipientCommandProps = {
  userId: string;
  name: string;
  email: string;
  accountBank: string;
  accountType: string;
  accountNumber: number;
};

export class CreateRecipientCommand extends Command {
  userId: string;
  name: string;
  email: string;
  accountBank: string;
  accountType: string;
  accountNumber: number;

  constructor({ userId, name, email, accountBank, accountType, accountNumber }: CreateRecipientCommandProps) {
    super();
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.accountBank = accountBank;
    this.accountType = accountType;
    this.accountNumber = accountNumber;
  }
}
