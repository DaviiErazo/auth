import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { CommandBus } from "../../../modules/Shared/domain/CommandBus";
import { DeleteUserCommand } from "../../../modules/Users/application/Delete/DeleteUserCommand";
import { UserNotFound } from "../../../modules/Users/domain/UserNotFound";

export class UserDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const userId: string = req.params.id;

    const createDeleteUserCommand = new DeleteUserCommand(userId);

    try {
      await this.commandBus.dispatch(createDeleteUserCommand);
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
