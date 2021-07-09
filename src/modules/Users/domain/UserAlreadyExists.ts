export class UserAlreadyExists extends Error {
    constructor(id: string) {
        super(`User with email ${id} already exists`);
    }
}