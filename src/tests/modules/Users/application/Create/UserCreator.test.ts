import { UserRepositoryMock } from "../../__mocks__/UserRepositoryMock";
import EventBusMock from "../../__mocks__/EventBusMock";
import { CreateUserCommandHandler } from "../../../../../modules/Users/application/Create/CreateUserCommandHandler";
import { UserCreator } from "../../../../../modules/Users/application/Create/UserCreator";
import { CreateUserCommandMother } from "./CreateUserCommandMother";
import { UserMother } from "../../domain/UserMother";

let repository: UserRepositoryMock;
let handler: CreateUserCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new UserRepositoryMock();
  const creator = new UserCreator(repository, eventBus);
  handler = new CreateUserCommandHandler(creator);
});

describe("UserCreator", () => {
  it("should create a valid user", async () => {
    const command = CreateUserCommandMother.random();
    await handler.handle(command);

    const user = UserMother.fromCommand(command);
    repository.assertLastSavedUserIs(user);
  });
});
