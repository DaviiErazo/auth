import { Email } from './Email';

export class WelcomeUserEmail extends Email {
  constructor(to: string) {
    super({
      from: 'da.erazom@gmail.com',
      to,
      subject: 'Welcome',
      body: 'Welcome to our platform'
    });
  }
}
