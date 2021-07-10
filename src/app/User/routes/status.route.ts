import { Router, Request, Response } from "express";
import StatusController from "../controllers/StatusGetController";
import { statusGetController } from "../dependency-injection";

export const register = (router: Router) => {
  const controller: StatusController = statusGetController;
  router.get("/status", (req: Request, res: Response) => controller.run(req, res));
};
