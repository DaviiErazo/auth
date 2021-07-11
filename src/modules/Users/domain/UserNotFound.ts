export class UserNotFound extends Error {
  constructor(email: string) {
    super(`User with email ${email} not found`);
  }
}
