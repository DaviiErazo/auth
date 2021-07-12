import { InvalidArgumentError } from "../../Shared/domain/value-object/InvalidArgumentError";
import { ValueObject } from "../../Shared/domain/value-object/ValueObject";
import * as bcrypt from "bcrypt-nodejs";

export interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  public static minLength: number = 6;

  private constructor(props: UserPasswordProps) {
    super(props);
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
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  public isAlreadyHashed(): boolean {
    if (!this.props.hashed || this.props.hashed === undefined) return false;
    return this.props.hashed;
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
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value));
      }
    });
  }

  public static create(props: UserPasswordProps): UserPassword {
    this.isAppropriateLength(props.value);
    this.againstNullOrUndefined(props.value);
    return new UserPassword(props);
  }
}
