import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { CommandBus } from "../../../modules/Shared/domain/CommandBus";
import { LogoutUserCommand } from "../../../modules/Users/application/Logout/LogoutUserCommand";
import { UserNotFound } from "../../../modules/Users/domain/UserNotFound";

export class UserLogoutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.body.id;
    const logoutUserCommand = new LogoutUserCommand(id);

    try {
      await this.commandBus.dispatch(logoutUserCommand);
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
      }
    }
    res.status(httpStatus.OK).send();
  }
}
