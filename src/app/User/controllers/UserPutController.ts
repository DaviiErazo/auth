import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { UserAlreadyExists } from "../../../modules/Users/domain/UserAlreadyExists";
import { CommandBus } from "../../../modules/Shared/domain/CommandBus";
import { CreateUserCommand } from "../../../modules/Users/application/Create/CreateUSerCommand";

export class UserPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const createUserCommand = new CreateUserCommand({ username, password, email });

    try {
      await this.commandBus.dispatch(createUserCommand);
    } catch (error) {
      if (error instanceof UserAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
      }
    }
    res.status(httpStatus.CREATED).send();
  }
}
