import { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller } from "./Controller";
import { CommandBus } from "../../../modules/Shared/domain/CommandBus";
import { CreateRecipientCommand } from "../../../modules/Recipients/application/Create/CreateRecipientCommand";

export class RecientPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const userId: string = req.body.userId;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const accountBank: string = req.body.accountBank;
    const accountType: string = req.body.accountType;
    const accountNumber: number = req.body.accountNumber;

    const createUserCommand = new CreateRecipientCommand({ userId, name, email, accountBank, accountNumber, accountType });

    try {
      await this.commandBus.dispatch(createUserCommand);
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
    res.status(httpStatus.CREATED).send();
  }
}
