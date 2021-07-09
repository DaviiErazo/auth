import { UserName } from './UserName';
import { UserId } from '../Shared/domain/UserId';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

import { AggregateRoot } from '../../Shared/domain/AggregateRoot';

type Params = {
    id: UserId;
    name: UserName;
    email: UserEmail;
    password: UserPassword;
}

export class User extends AggregateRoot {
    readonly id: UserId;
    readonly name: UserName;
    readonly email: UserEmail;
    readonly password: UserPassword;

    constructor(userProps: Params) {
        super();
        this.id = userProps.id;
        this.name = userProps.name;
        this.email = userProps.email;
        this.password = userProps.password;
    }

    static create(userProps: Params): User {
        const user = new User(userProps);

        return user;
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value
        }
    }

}