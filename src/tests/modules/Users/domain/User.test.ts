import { User } from "../../../../modules/Users/domain/User";
import { CreateUserCommandMother } from "../application/CreateUserCommandMother";
import { UserEmailMother } from "./UserEmailMother";
import { UserMother } from "./UserMother";
import { UserNameMother } from "./UserNameMother";
import { UserPasswordMother } from "./UserPasswordMother";

describe("User", () => {
  it("should return a new user instance", () => {
    const command = CreateUserCommandMother.random();

    const user = UserMother.fromCommand(command);

    expect(user.username.props.value).toBe(command.username);
    expect(user.password.props.value).toBe(command.password);
    expect(user.email.props.value).toBe(command.email);
  });

  it("should record a UserCreatedDomainEvent after its creation", () => {
    const username = UserNameMother.random();
    const password = UserPasswordMother.random();
    const email = UserEmailMother.random();

    const user = User.create({ username, password, email });

    const events = user.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe("user.created");
  });
});
