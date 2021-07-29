import { InvalidArgumentError } from "../../../../modules/Shared/domain/value-object/InvalidArgumentError";
import { UserName } from "../../../../modules/Users/domain/UserName";

describe("UserEmail", () => {
  it("throws error with an invalid email", async () => {
    let exception;
    const invalidName = "dssdad@ddasdasdasdasdasdasdasdasdasdasdasdasdasdasasd";

    try {
      await UserName.create({ value: invalidName });
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(InvalidArgumentError);
    expect(exception.message).toBe(`The User Name <${invalidName}> has more than 30 characters`);
  });
});
