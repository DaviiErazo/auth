import { v4 as uuidv4 } from "uuid";
import { UniqueEntityID } from "../../../../modules/Shared/domain/UniqueEntityID";

describe("UniqueEntityID", () => {
  it("should return a true when compare same UniqueEntityID instance", () => {
    const id = uuidv4();
    const uniqueEntityId = new UniqueEntityID(id);
    const anotherUniqueEntityId = new UniqueEntityID(uniqueEntityId.toString());

    expect(uniqueEntityId.equals(anotherUniqueEntityId)).toBe(true);
  });

  it("should return a false when compare different UniqueEntityID instance", () => {
    const id = uuidv4();
    const uniqueEntityId = new UniqueEntityID(id);

    const anotherId = uuidv4();
    const anotherUniqueEntityId = new UniqueEntityID(anotherId);

    expect(uniqueEntityId.equals(anotherUniqueEntityId)).toBe(false);
  });

  it("should return a false when compare null UniqueEntityID instance", () => {
    const id = uuidv4();
    const uniqueEntityId = new UniqueEntityID(id);

    expect(uniqueEntityId.equals(null)).toBe(false);
  });
});
