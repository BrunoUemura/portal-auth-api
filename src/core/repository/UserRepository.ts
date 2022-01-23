import { User } from '@src/core/entity/User';

export default interface UserRepository {
  findOne(username: string): Promise<User>;
  insert(
    id: string,
    username: string,
    email: string,
    password: string,
  ): Promise<User>;
}
