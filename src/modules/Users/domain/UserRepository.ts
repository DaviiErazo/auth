import { User } from "./User";

export interface UserRepository {
  save(user: User): Promise<void>;
  exists(email: string, username: string): Promise<void>;
  getUserByEmail(email: string): Promise<User>;
  getUserById(id: string): Promise<User>;
}
