import { MongoRepository } from "../../../Shared/infrastructure/Persistence/mongo/MongoRepository";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save(user: User): Promise<void> {
    return this.persist("", user);
  }

  public async exists(email: string): Promise<boolean> {
    const collection = await this.collection();
    const user = await collection.findOne({ email: email });
    return !!user === true;
  }

  protected moduleName(): string {
    return "users";
  }
}
