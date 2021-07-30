import { Router, Request, Response } from "express";
import { UserLoginController } from "../User/controllers/UserLoginController";
import { UserLogoutController } from "../User/controllers/UserLogoutController";
import { UserPutController } from "../User/controllers/UserPutController";
import { UserDeleteController } from "../User/controllers/UserDeleteController";
import { UserRefreshAccessTokenController } from "../User/controllers/UserRefreshAccessTokenController";
import container from "../dependency-injection";
import { UsersGetController } from "../User/controllers/UsersGetController";

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

  const userDeleteUserController: UserDeleteController = container.get("User.controllers.UserDeleteController");
  router.post("/user/delete", (req: Request, res: Response) => userDeleteUserController.run(req, res));

  const userGetUsersController: UsersGetController = container.get("User.controllers.UsersGetController");
  router.get("/users", (req: Request, res: Response) => userGetUsersController.run(req, res));
};
