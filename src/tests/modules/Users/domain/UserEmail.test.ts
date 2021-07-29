import { InvalidArgumentError } from "../../../../modules/Shared/domain/value-object/InvalidArgumentError";
import { UserEmail } from "../../../../modules/Users/domain/UserEmail";

describe("UserEmail", () => {
  it("throws error with an invalid email", async () => {
    let exception;
    const invalidEmail = "dssdad@dd";

    try {
      await UserEmail.create({ value: invalidEmail });
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(InvalidArgumentError);
    expect(exception.message).toBe(`The User Email <${invalidEmail}> is invalid`);
  });
});
