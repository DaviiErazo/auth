import { UserRepository } from "../../../../modules/Users/domain/UserRepository";
import { User } from "../../../../modules/Users/domain/User";
import { UserId } from "../../../../modules/Users/Shared/domain/UserId";

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedUser = mock.calls[mock.calls.length - 1][0] as User;
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.toPrimitives().email).toEqual(expected.toPrimitives().email);
    expect(lastSavedUser.toPrimitives().username).toEqual(expected.toPrimitives().username);
    expect(lastSavedUser.toPrimitives().password).toEqual(expected.toPrimitives().password);

  }

  async exists(email: string, username: string): Promise<void> {
    this.mockSearch(email, username);
  }

  async getUserById(id: string): Promise<User> {
    return this.mockSearch(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.mockSearch(email);
  }

  async getUserByUserName(username: string): Promise<User> {
    return this.mockSearch(username);
  }

  whenSearchThenReturn(value: User): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedUserIs(expected: UserId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  
}
