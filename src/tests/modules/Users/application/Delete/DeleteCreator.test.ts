import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import EventBusMock from "../../__mocks__/EventBusMock";
import { DeleteUserCommandHandler } from "../../../../../modules/Users/application/Delete/DeleteUserCommandHandler";
import { DeleteUser } from "../../../../../modules/Users/application/Delete/DeleteUser";
import { DeleteUserCommandMother } from "./DeleteUserCommandMother";
import { UserMother } from "../../domain/UserMother";

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

    //const user = await repository.getUserById(existingUser.id.toString());
    const command = DeleteUserCommandMother.create(existingUser.id.toString());
    await handler.handle(command);
  });
});
