import { Command } from "../../../Shared/domain/Command";

export class RefreshAccessTokenCommand extends Command {
  refreshToken: string;

  constructor(refreshToken: string) {
    super();
    this.refreshToken = refreshToken;
  }
}
