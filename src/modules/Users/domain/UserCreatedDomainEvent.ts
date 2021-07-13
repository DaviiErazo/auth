import { DomainEvent } from "../../Shared/domain/DomainEvent";

type CreateUserDomainEventBody = {
  readonly email: string;
  readonly username: string;
  readonly eventName: string;
  readonly id: string;
};

interface UserCreatedProps {
  id: string;
  eventId?: string;
  email: string;
  username: string;
  occurredOn?: Date;
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "user.created";

  readonly email: string;
  readonly username: string;

  constructor(props: UserCreatedProps) {
    super(UserCreatedDomainEvent.EVENT_NAME, props.id, props.eventId, props.occurredOn);
    this.email = props.email;
    this.username = props.username;
  }

  toPrimitive(): CreateUserDomainEventBody {
    const { username, email, aggregateId } = this;
    return {
      username,
      email,
      eventName: UserCreatedDomainEvent.EVENT_NAME,
      id: aggregateId,
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateUserDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new UserCreatedDomainEvent({
      id: aggregateId,
      email: body.email,
      username: body.username,
      eventId,
      occurredOn,
    });
  }
}
