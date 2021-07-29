import { RefreshAccessTokenCommand } from "../../../../../modules/Users/application/RefreshAccessToken/RefreshAccessTokenCommand";

export class RefreshAccessTokenCommandMother {
  static create(userTokenRefresh: string): RefreshAccessTokenCommand {
    return new RefreshAccessTokenCommand(userTokenRefresh);
  }
}
