import { CreateUserCommandHandler } from "../../../../modules/Users/application/Create/CreateUserCommandHandler";
import { UserCreator } from "../../../../modules/Users/application/Create/UserCreator";

const userCreator = new UserCreator();
const createUserCommandHandler = new CreateUserCommandHandler(userCreator);

export { createUserCommandHandler };
