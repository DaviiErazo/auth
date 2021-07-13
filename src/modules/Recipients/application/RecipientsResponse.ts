import { Recipient } from "../domain/Recipient";

export class RecipientsResponse {
  readonly recipients: Array<Recipient>;

  constructor(recipients: Array<Recipient>) {
    this.recipients = recipients;
  }
}
