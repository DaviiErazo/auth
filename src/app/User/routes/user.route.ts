import { Router, Request, Response } from "express";
import { UserLoginController } from "../controllers/UserLoginController";
import { UserLogoutController } from "../controllers/UserLogoutController";
import { UserPutController } from "../controllers/UserPutController";
import { UserRefreshAccessTokenController } from "../controllers/UserRefreshAccessTokenController";
import container from "../dependency-injection";

export const register = (router: Router) => {
  const userPutController: UserPutController = container.get("User.controllers.UserPutController");
  router.post("/user/register", (req: Request, res: Response) => userPutController.run(req, res));

  const userLoginUserController: UserLoginController = container.get("User.controllers.UserLoginController");
  router.post("/user/login", (req: Request, res: Response) => userLoginUserController.run(req, res));

  const userLogoutUserController: UserLogoutController = container.get("User.controllers.UserLogoutController");
  router.post("/user/logout", (req: Request, res: Response) => userLogoutUserController.run(req, res));

  const userRefreshAccessTokenController: UserRefreshAccessTokenController = container.get(
    "User.controllers.UserRefreshAccessTokenController"
  );
  router.post("/user/refreshtoken", (req: Request, res: Response) => userRefreshAccessTokenController.run(req, res));
};
