import { EmailSender } from '../../domain/EmailSender';3
import { WelcomeUserEmail } from '../../domain/WelcomeUserEmail';

export default class SendWelcomeUserEmail {
    constructor(private emailSender: EmailSender) { }

    async run(userEmailAddress: string): Promise<void> {
        const welcomeUserEmail = new WelcomeUserEmail(userEmailAddress);
        try {
            await this.emailSender.send(welcomeUserEmail);
        } catch (error) {
            console.log(error.message);
            return;
        }
    }
}