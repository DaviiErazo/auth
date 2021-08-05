import { UserAlreadyExists } from "../../../../../modules/Users/domain/UserAlreadyExists";
import { UserRepository } from "../../../../../modules/Users/domain/UserRepository";
import { UserMother } from "../../domain/UserMother";
import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";

let repository: UserRepository;

beforeEach(async () => {
  repository = new UserRepositoryMock();
});

afterAll(async () => {
  repository = new UserRepositoryMock();
});

describe("UserRepository", () => {
  describe("#save", () => {
    it("should save a user", async () => {
      const user = UserMother.random();
      await repository.save(user);
    });
  });

  describe("#exists", () => {
    it("should throw error that user already exists", async () => {
      const expectedUser = UserMother.random();
      await repository.save(expectedUser);

      const username = expectedUser.email.props.value;
      const email = expectedUser.email.props.value;

      let exception = null;

      try {
        await repository.exists(username, email);
      } catch (error) {
        exception = error;
      }
      expect(exception).toBeInstanceOf(UserAlreadyExists);
      expect(exception.message).toBe(`User with email ${email} or username ${username} already exists`);
    });
  });

  describe("#search", () => {
    it("should return an exist user by email", async () => {
      const expectedUser = UserMother.random();
      await repository.save(expectedUser);

      const email = expectedUser.email.props.value;
      const user = await repository.getUserByEmail(email);

      // :TODO should to compare between instances, not by UserID
      // check way to create user objects
      // an user created by requests should be the same that an user created by BD
      const expectedUserId = expectedUser.id.toString();
      const userId = user.id.toString();

      expect(expectedUserId).toEqual(userId);
    });

    it("should return an exist user by userId", async () => {
      const expectedUser = UserMother.random();
      await repository.save(expectedUser);

      const id = expectedUser.id.toString();
      const user = await repository.getUserById(id);

      // :TODO should to compare between instances, not by UserID
      // check way to create user objects
      // an user created by requests should be the same that an user created by BD
      const expectedUserId = expectedUser.id.toString();
      const userId = user.id.toString();

      expect(expectedUserId).toEqual(userId);
    });

    it("should return an exist user by username", async () => {
      const expectedUser = UserMother.random();
      await repository.save(expectedUser);

      const username = expectedUser.username.props.value;
      const user = await repository.getUserByUserName(username);

      // :TODO should to compare between instances, not by UserID
      // check way to create user objects
      // an user created by requests should be the same that an user created by BD
      const expectedUserId = expectedUser.id.toString();
      const userId = user.id.toString();

      expect(expectedUserId).toEqual(userId);
    });
  });
});
