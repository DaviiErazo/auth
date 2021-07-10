import { Router, Request, Response } from "express";
import { UserPutController } from "../controllers/UserPutController";
import { userPutController } from "../dependency-injection";

export const register = (router: Router) => {
  const controller: UserPutController = userPutController;
  router.put("/user", (req: Request, res: Response) => controller.run(req, res));
};
