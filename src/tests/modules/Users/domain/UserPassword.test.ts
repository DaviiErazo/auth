import { InvalidArgumentError } from "../../../../modules/Shared/domain/value-object/InvalidArgumentError";
import { UserPassword } from "../../../../modules/Users/domain/UserPassword";
import { UserPasswordMother } from "./UserPasswordMother";

describe("UserPassword", () => {
  it("throws error with an invalid password", async () => {
    let exception;
    const invalidPassword = "@dd";

    try {
      await UserPassword.create({ value: invalidPassword });
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(InvalidArgumentError);
    expect(exception.message).toBe(`The password ${invalidPassword} doesnt meet criteria [6 chars min].`);
  });

  it("throws error with an null or undefined password", async () => {
    let exception;
    const invalidPassword = null;

    try {
      await UserPassword.create({ value: invalidPassword });
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(InvalidArgumentError);
    expect(exception.message).toBe(`The password <${invalidPassword}> is invalid.`);
  });

  it("should return false when compare a hashed password with unhashed", async () => {
    let compare;
    const randomPassword = UserPasswordMother.random().props.value;
    const userPassword = UserPassword.create({ value: randomPassword, hashed: true });
    compare = await userPassword.comparePassword(randomPassword);

    expect(compare).toBe(false);
  });

  it("should return true when compare a hashed password", async () => {
    let compare;
    const randomPassword = UserPasswordMother.random().props.value;
    const userPassword = UserPassword.create({ value: randomPassword });

    const passwordHashed = await userPassword.getHashedValue();
    const userPasswordHashed = UserPassword.create({ value: passwordHashed, hashed: true });
    compare = await userPasswordHashed.comparePassword(randomPassword);

    expect(compare).toBe(true);
  });

  it("should return false when compare a invalid hashed password", async () => {
    let compare;
    const randomPassword = UserPasswordMother.random().props.value;

    const userPasswordHashed = UserPassword.create({ value: "passwordHashed", hashed: true });
    compare = await userPasswordHashed.comparePassword(randomPassword);

    expect(compare).toBe(false);
  });

  it("should password already hashed", async () => {
    const randomPassword = UserPasswordMother.random().props.value;

    const userPassword = UserPassword.create({ value: randomPassword });
    const passwordHashed = await userPassword.getHashedValue();

    const userPasswordHashed = UserPassword.create({ value: passwordHashed, hashed: true });
    const hashedReturned = await userPasswordHashed.getHashedValue();

    expect(passwordHashed).toEqual(hashedReturned);
  });
});
