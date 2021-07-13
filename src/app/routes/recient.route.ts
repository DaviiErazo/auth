import { Router, Request, Response } from "express";
import { RecientPutController } from "../Recipient/controllers/RecientPutController";
import container from "../dependency-injection";

export const register = (router: Router) => {
  const recipientPutController: RecientPutController = container.get("Recipient.controllers.RecientPutController");
  router.post("/recipient/create", (req: Request, res: Response) => recipientPutController.run(req, res));
};
