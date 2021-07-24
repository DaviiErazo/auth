import { UniqueEntityID } from "../../../../modules/Shared/domain/UniqueEntityID";
import { UserId } from "../../../../modules/Users/domain/UserId";

export class UserIdMother {
  static create(value: UniqueEntityID): UserId {
    return UserId.create(value);
  }

  static random(): UserId {
    return this.create(new UniqueEntityID());
  }
}
