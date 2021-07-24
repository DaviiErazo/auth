import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../../Users/infrastructure/services/Redis/AuthService";

export class Middleware {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  private endRequest(status: 400 | 401 | 403, message: string, res: Response): any {
    return res.status(status).send({ message });
  }

  public ensureAuthenticated() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["authorization"];
      if (token) {
        const decoded = await this.authService.decodeJWT(token);
        const signatureFailed = !!decoded === false;

        if (signatureFailed) {
          return this.endRequest(403, "Token signature expired.", res);
        }

        // See if the token was found
        const { username } = decoded;
        const tokens = await this.authService.getTokens(username);

        // if the token was found, just continue the request.
        if (tokens.length !== 0) {
          // req.decoded = decoded;
          return next();
        } else {
          return this.endRequest(403, "Auth token not found. User is probably not logged in. Please login again.", res);
        }
      } else {
        return this.endRequest(403, "No access token provided", res);
      }
    };
  }
}
