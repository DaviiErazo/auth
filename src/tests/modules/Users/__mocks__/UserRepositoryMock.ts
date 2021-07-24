import { UserRepository } from "../../../../modules/Users/domain/UserRepository";
import { User } from "../../../../modules/Users/domain/User";
import { UserId } from "../../../../modules/Users/Shared/domain/UserId";
import { UserAlreadyExists } from "../../../../modules/Users/domain/UserAlreadyExists";
import { UserNotFound } from "../../../../modules/Users/domain/UserNotFound";

export class UserRepositoryMock implements UserRepository {
  private usersMock: User[] = [];

  async save(user: User): Promise<void> {
    this.usersMock.push(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const lastSavedUser = this.usersMock[this.usersMock.length - 1] as User;
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.toPrimitives().email).toEqual(expected.toPrimitives().email);
    expect(lastSavedUser.toPrimitives().username).toEqual(expected.toPrimitives().username);
    expect(lastSavedUser.toPrimitives().password).toEqual(expected.toPrimitives().password);
  }

  async exists(email: string, username: string): Promise<void> {
    const document = this.usersMock.find((user) => user.email.props.value === email && user.username.props.value);
    if (document) throw new UserAlreadyExists(email, username);
  }

  async getUserById(id: string): Promise<User> {
    const document = this.usersMock.find((user) => user.id.toString() === id);

    if (!document) throw new UserNotFound(id);

    return document;
  }

  async getUserByEmail(email: string): Promise<User> {
    const document = this.usersMock.find((user) => user.email.props.value === email);

    if (!document) throw new UserNotFound(email);

    return document;
  }

  async getUserByUserName(username: string): Promise<User> {
    const document = this.usersMock.find((user) => user.username.props.value === username);

    if (!document) throw new UserNotFound(username);

    return document;
  }
}
