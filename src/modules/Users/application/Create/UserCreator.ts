import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

import { UserName } from "../../domain/UserName";
import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { EventBus } from "../../../Shared/domain/EventBus";

type UserCreatorProps = {
  username: UserName;
  email: UserEmail;
  password: UserPassword;
};

export class UserCreator {
  private repository: UserRepository;
  private eventBus: EventBus;

  constructor(repository: UserRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(props: UserCreatorProps): Promise<void> {
    let user: User;
    const email = props.email.props.value;
    const username = props.username.props.value

    await this.repository.exists(email, username);
    user = User.create(props);
    
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
