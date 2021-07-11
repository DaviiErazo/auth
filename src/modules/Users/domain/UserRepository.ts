import { User } from "./User";

export interface UserRepository {
  save(user: User): Promise<void>;
  exists(email: string): Promise<void>;
  getUserByEmail(email: string): Promise<User>;
}
