import { Router, Request, Response } from "express";
import StatusController from "../User/controllers/StatusGetController";
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller: StatusController = container.get('User.controllers.StatusGetController');
  router.get("/status", (req: Request, res: Response) => controller.run(req, res));
};
