export class UserNotFound extends Error {
  constructor(value: string) {
    super(`User ${value} not found`);
  }
}
