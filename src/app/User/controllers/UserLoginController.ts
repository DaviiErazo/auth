import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { CommandBus } from "../../../modules/Shared/domain/CommandBus";
import { LoginUserCommand } from "../../../modules/Users/application/Login/LoginUserCommand";
import { UserNotFound } from "../../../modules/Users/domain/UserNotFound";

export class UserLoginController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const password: string = req.body.password;
    const email: string = req.body.email;
    const createLoginUserCommand = new LoginUserCommand(email, password);

    try {
      await this.commandBus.dispatch(createLoginUserCommand);
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
      }
    }
    res.status(httpStatus.CREATED).send();
  }
}
