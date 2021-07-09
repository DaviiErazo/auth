import { User } from '../../domain/User';

import { UserId } from '../../../Users/Shared/domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';

type Params = {
    id: UserId;
    name: UserName;
    email: UserEmail;
    password: UserPassword;
}

export class UserCreator {
    async run(userProps: Params): Promise<void> {
        const user = User.create(userProps);
        console.log(user);
    }
}