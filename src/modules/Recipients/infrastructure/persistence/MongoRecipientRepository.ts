import { MongoRepository } from "../../../Shared/infrastructure/Persistence/mongo/MongoRepository";
import { Recipient } from "../../domain/Recipient";
import { RecipientRepository } from "../../domain/RecipientRepository";

export class MongoRecipientRepository extends MongoRepository implements RecipientRepository {
  public async save(recipient: Recipient): Promise<void> {
    const recipientId: string = recipient.id.toString();

    const collection = await this.collection();
    const document = { ...recipient.toPrimitives(), _id: recipientId, id: undefined };

    await collection.updateOne({ _id: recipientId }, { $set: document }, { upsert: true });
  }

  protected moduleName(): string {
    return "recipients";
  }
}
