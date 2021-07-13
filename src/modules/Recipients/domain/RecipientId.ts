import { Entity } from "../../Shared/domain/Entity";
import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";

export class RecipientId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): RecipientId {
    return new RecipientId(id);
  }
}
