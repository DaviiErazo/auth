import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { CommandBus } from "../../../modules/Shared/domain/CommandBus";
import { RefreshAccessTokenCommand } from "../../../modules/Users/application/RefreshAccessToken/RefreshAccessTokenCommand";
import { UserNotFound } from "../../../modules/Users/domain/UserNotFound";

export class UserRefreshAccessTokenController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const refreshToken: string = req.body.refreshToken;
    const refreshAccessTokenCommand = new RefreshAccessTokenCommand(refreshToken);

    try {
      const response = await this.commandBus.dispatch(refreshAccessTokenCommand);
      res.status(httpStatus.OK).send({"accessToken": response});
    } catch (error) {
      if (error instanceof UserNotFound) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
      }
    }
  }
}
