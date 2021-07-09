import { CreateUserCommand } from "./CreateUserCommand";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";
import { UserCreator } from "./UserCreator";
import { Command } from "../../../Shared/domain/Command";

import { UserId } from "../../Shared/domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserEmail } from "../../domain/UserEmail";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
    constructor(private userCreator: UserCreator) { }

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    async handle(command: CreateUserCommand): Promise<void> {
        const id = new UserId(command.id);
        const name = new UserName(command.name);
        const password = new UserPassword(command.password);
        const email = new UserEmail(command.email);

        await this.userCreator.run({
            id,
            name,
            password,
            email
        });
    }
}