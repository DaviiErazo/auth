import { CreateRecipientCommand } from "./CreateRecipientCommand";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";
import { RecipientCreator } from "./RecipientCreator";
import { RecipientName } from "../../domain/RecipientName";
import { RecipientEmail } from "../../domain/RecipientEmail";
import { AccountBank } from "../../domain/AccountBank";
import { AccountType } from "../../domain/AccountType";

export class CreateRecipientCommandHandler implements CommandHandler<CreateRecipientCommand> {
  constructor(private recipientCreator: RecipientCreator) {}

  subscribedTo(): String {
    return CreateRecipientCommand.name;
  }

  async handle(command: CreateRecipientCommand): Promise<void> {
    const userId = command.userId
    const name = RecipientName.create({ value: command.name });
    const email = RecipientEmail.create({ value: command.email });
    const accountBank = AccountBank.create({ value: command.accountBank });
    const accountType = AccountType.create({ value: command.accountType });
    const accountNumber = command.accountNumber;

    await this.recipientCreator.run({ userId, name, email, accountBank, accountType, accountNumber });
  }
}
