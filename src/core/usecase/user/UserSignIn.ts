import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NotFoundError } from '@src/util/error/NotFoundError';
import { UnauthorizedError } from '@src/util/error/UnauthorizedError';
import { IUserSignIn } from '@src/core/interface/UserInterfaces';
import UserRepository from '@src/core/repository/UserRepository';

export default class UserSignIn {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, password }: IUserSignIn) {
    const user = await this.userRepository.findOne(username);

    if (!user) {
      throw new NotFoundError('User not registered');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError('Authentication Failed');
    }

    const payload = { id: user.id };
    const expiration = { expiresIn: '1h' };

    const token = jwt.sign(payload, String(process.env.JWT_SECRET), expiration);

    return {
      status: 200,
      message: 'Authentication Successful',
      token,
      user,
    };
  }
}
