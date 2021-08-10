import { HttpClient } from '../../Shared/infrastructure/Services/HttpClient';
import { Email } from "../domain/Email";
import { EmailSender } from "../domain/EmailSender";

export default class EmailSenderServices extends HttpClient implements EmailSender {
    constructor(baseURL: string) {
        super(baseURL);
    }

    async send(email: Email): Promise<void> {
        await this.http.post('/email/welcome', email.toPrimitives());
    }
}