
import { Connection } from 'mongoose';
import { userSchema } from '../schemas/user';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('user', userSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];