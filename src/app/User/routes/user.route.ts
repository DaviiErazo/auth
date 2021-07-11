import { Router, Request, Response } from "express";
import { UserPutController } from "../controllers/UserPutController";
import container from "../dependency-injection";

export const register = (router: Router) => {
  const controller: UserPutController = container.get("User.controllers.UserPutController");
  router.put("/user", (req: Request, res: Response) => controller.run(req, res));
};
