import { DomainEvent } from "../../Shared/domain/DomainEvent";

type UserCreatedDomainEventBody = { userEmailAddress: string };

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created'
  readonly userEmailAddress: string;

  constructor(data: { id: string, userEmailAddress: string, eventId?: string, occurredOn?: Date }) {
    const { id, eventId, occurredOn, userEmailAddress } = data;
    super(UserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.userEmailAddress = userEmailAddress;
  }

  toPrimitive(): Object {
    return { userEmailAddress: this.userEmailAddress, eventName: UserCreatedDomainEvent.EVENT_NAME };
  }

  static fromPrimitives(
    aggregateId: string,
    body: UserCreatedDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new UserCreatedDomainEvent({
      id: aggregateId,
      userEmailAddress: body.userEmailAddress,
      eventId,
      occurredOn
    })
  }
}