import { UserName } from "../../../../modules/Users/domain/UserName";
import { WordMother } from "../../Shared/domain/WordMother";

export class UserNameMother {
  static create(value: string): UserName {
    return UserName.create({ value });
  }

  static random(): UserName {
    return this.create(WordMother.random());
  }
}
