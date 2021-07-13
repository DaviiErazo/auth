import { RecipientName } from "../../domain/RecipientName";
import { RecipientEmail } from "../../domain/RecipientEmail";
import { AccountBank } from "../../domain/AccountBank";
import { AccountType } from "../../domain/AccountType";

import { EventBus } from "../../../Shared/domain/EventBus";
import { RecipientRepository } from "../../domain/RecipientRepository";
import { Recipient } from "../../domain/Recipient";

type RecipientCreatorProps = {
  userId: string;
  name: RecipientName;
  email: RecipientEmail;
  accountBank: AccountBank;
  accountType: AccountType;
  accountNumber: Number;
};

export class RecipientCreator {
  private repository: RecipientRepository;
  private eventBus: EventBus;

  constructor(repository: RecipientRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(props: RecipientCreatorProps): Promise<void> {
    let recipient: Recipient;
    recipient = Recipient.create(props);

    await this.repository.save(recipient);
    await this.eventBus.publish(recipient.pullDomainEvents());
  }
}
