import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { EventBus } from "../../../Shared/domain/EventBus";

export class DeleteUser {
  private repository: UserRepository;
  private eventBus: EventBus;

  constructor(repository: UserRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(id: string): Promise<void> {
    let user: User;

    user = await this.repository.getUserById(id);

    user.delete();
    await this.repository.save(user);
    await this.eventBus.publish(user.pullDomainEvents());
  }
}
