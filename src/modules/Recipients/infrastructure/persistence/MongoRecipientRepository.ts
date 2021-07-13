import { Criteria } from "../../../Shared/domain/criteria/Criteria";
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

  public async matching(criteria: Criteria): Promise<Array<Recipient>> {
    const collection = await this.collection();

    const name = "David";
    const email = "da.erazom@gmail.com";
    const accountBank = "asdasdasd";
    const accountType = "sdasdad";
    const accountNumber = 123123;
    const userId = "afcd7f9f-7e3d-4d3b-bf59-c4267c9ce9a0";
    const id = "asdasd"

    const recipientRaw = collection.find().limit(criteria.limit);
    console.log(recipientRaw);

    const recipient = Recipient.fromPrimitives({
      id,
      userId,
      name,
      email,
      accountBank,
      accountType,
      accountNumber,
    });

    return [recipient]
  }

  protected moduleName(): string {
    return "recipients";
  }
}
