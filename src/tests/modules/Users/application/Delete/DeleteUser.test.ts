import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import EventBusMock from "../../__mocks__/EventBusMock";
import { DeleteUserCommandHandler } from "../../../../../modules/Users/application/Delete/DeleteUserCommandHandler";
import { DeleteUser } from "../../../../../modules/Users/application/Delete/DeleteUser";
import { DeleteUserCommandMother } from "./DeleteUserCommandMother";
import { UserMother } from "../../domain/UserMother";
import { UserNotFound } from "../../../../../modules/Users/domain/UserNotFound";

let repository: UserRepositoryMock;
let handler: DeleteUserCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new UserRepositoryMock();
});

describe("UserDelete", () => {
  it("should delete a existing user", async () => {
    const existingUser = UserMother.random();
    await repository.save(existingUser);
    const deleteUseCase = new DeleteUser(repository, eventBus);
    handler = new DeleteUserCommandHandler(deleteUseCase);

    const command = DeleteUserCommandMother.create(existingUser.id.toString());
    await handler.handle(command);
  });

  it("throws an error if a delete command is handled for a user that does not exist", async () => {
    let exception;
    const deleteUseCase = new DeleteUser(repository, eventBus);
    handler = new DeleteUserCommandHandler(deleteUseCase);

    const command = DeleteUserCommandMother.create("RandomID");

    try {
      await handler.handle(command);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(UserNotFound);
    expect(exception.message).toBe(`User RandomID not found`);
  });
});
