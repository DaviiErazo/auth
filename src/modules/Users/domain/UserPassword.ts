import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../Shared/domain/value-object/StringValueObject";
import * as bcrypt from "bcrypt-nodejs";

export class UserPassword extends StringValueObject {
  public static minLength: number = 6;
  public hashed: boolean;

  constructor(password: string, hashed: boolean) {
    super(password);
    this.hashed = hashed;
  }

  private static isAppropriateLength(password: string): void {
    if (password.length < this.minLength) {
      throw new InvalidArgumentError(`The password ${password} doesnt meet criteria [${this.minLength} chars min].`);
    }
  }

  private static againstNullOrUndefined(password: string): void {
    if (password === null || password === undefined) {
      throw new InvalidArgumentError(`The password ${password} is null or undefined.`);
    }
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.value === plainTextPassword;
    }
  }

  public isAlreadyHashed(): boolean {
    return this.hashed;
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      });
    });
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, "", null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.value);
      } else {
        return resolve(this.hashPassword(this.value));
      }
    });
  }

  public static create(password: string, hashed: boolean): UserPassword {
    this.isAppropriateLength(password);
    this.againstNullOrUndefined(password);
    return new UserPassword(password, hashed);
  }
}
