import { DomainEventClass } from "../../../Shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../Shared/domain/DomainEventSubscriber";
import { UserCreatedDomainEvent } from "../../domain/UserCreatedDomainEvent";
import SendWelcomeUserEmail from "./SendWelcomeUserEmail";

export default class SendWelcomeUserEmailOnUserRegistered implements DomainEventSubscriber<UserCreatedDomainEvent> {
    constructor(private sendWelcomeUserEmail: SendWelcomeUserEmail) {}

    subscribedTo(): DomainEventClass[] {
        return [UserCreatedDomainEvent];
    }

    async on(domainEvent: UserCreatedDomainEvent): Promise<void> {
        const email = domainEvent.userEmailAddress;
        await this.sendWelcomeUserEmail.run(email);
    }
}