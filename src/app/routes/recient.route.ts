import { Router, Request, Response } from "express";
import { RecientPutController } from "../Recipient/controllers/RecientPutController";
import container from "../dependency-injection";
import { RecipientsGetController } from "../Recipient/controllers/RecipientsGetController";

export const register = (router: Router) => {
  const recipientPutController: RecientPutController = container.get("Recipient.controllers.RecientPutController");
  router.post("/recipient/create", (req: Request, res: Response) => recipientPutController.run(req, res));

  const recipientsGetController: RecipientsGetController = container.get(
    "Recipient.controllers.RecipientGetController"
  );
  router.get("/recipients", (req: Request, res: Response) => recipientsGetController.run(req, res));
};
