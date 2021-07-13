export class UserAlreadyExists extends Error {
  constructor(email: string, username: string) {
    super(`User with email ${email} or username ${username} already exists`);
  }
}
