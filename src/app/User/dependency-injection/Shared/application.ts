import WinstonLogger from "../../../../modules/Shared/infrastructure/WinstonLogger";
import { CommandHandlersInformation } from "../../../../modules/Shared/infrastructure/CommandBus/CommandHandlersInformation";
import { InMemoryCommandBus } from "../../../../modules/Shared/infrastructure/CommandBus/InMemoryCommandBus";
import { createUserCommandHandler } from "../Users/application";

const winstonLogger = new WinstonLogger();
const commandHandlersInformation = new CommandHandlersInformation([createUserCommandHandler]);
const inMemoryCommandBus = new InMemoryCommandBus(commandHandlersInformation);

export { winstonLogger, inMemoryCommandBus };
