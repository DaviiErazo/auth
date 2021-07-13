import { RefreshAccessToken } from "./RefreshAccessToken";
import { RefreshAccessTokenCommand } from "./RefreshAccessTokenCommand";
import { CommandHandler } from "../../../Shared/domain/CommandHandler";
import { JWTToken } from "../../domain/jwt";

export class RefreshAccessTokenCommandHandler implements CommandHandler<RefreshAccessTokenCommand> {
  constructor(private refreshAccessToken: RefreshAccessToken) {}

  subscribedTo(): String {
    return RefreshAccessTokenCommand.name;
  }

  async handle(command: RefreshAccessTokenCommand): Promise<JWTToken> {
    const refreshToken = command.refreshToken;
    const accessToken = await this.refreshAccessToken.run(refreshToken);
    return accessToken;
  }
}
