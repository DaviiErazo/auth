import { MongoRepository } from "../../../Shared/infrastructure/Persistence/mongo/MongoRepository";
import { User } from "../../domain/User";
import { UserAlreadyExists } from "../../domain/UserAlreadyExists";
import { UserNotFound } from "../../domain/UserNotFound";
import { UserRepository } from "../../domain/UserRepository";

export class MongoUserRepository extends MongoRepository implements UserRepository {
  public async save(user: User): Promise<void> {
    const userId: string = user.id.toString();

    const collection = await this.collection();
    const document = { ...user.toPrimitives(), _id: userId, id: undefined };

    await collection.updateOne({ _id: userId }, { $set: document }, { upsert: true });
  }

  public async exists(email: string, username: string): Promise<void> {
    const collection = await this.collection();
    const query = { $or: [{ email: email }, { username: username }] };
    const document = await collection.findOne(query);

    if (document) throw new UserAlreadyExists(email, username);
  }

  public async getUserById(id: string): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id });

    if (!document) throw new UserNotFound(id);

    return User.fromPrimitives({ ...document, id: document._id });
  }

  public async getUserByEmail(email: string): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ email: email });

    if (!document) throw new UserNotFound(email);

    return User.fromPrimitives({ ...document, id: document._id });
  }

  public async getUserByUserName(username: string): Promise<User> {
    const collection = await this.collection();
    const document = await collection.findOne({ username: username });

    if (!document) throw new UserNotFound(username);

    return User.fromPrimitives({ ...document, id: document._id });
  }

  protected moduleName(): string {
    return "users";
  }
}
