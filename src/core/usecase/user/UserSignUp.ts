import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { BadRequestError } from '../../../shared/error/BadRequestError';
import { IUserSignUp } from '../../interface/UserInterfaces';
import UserRepository from '../../repository/UserRepository';
import PublishMessage from '../rabbitmq/PublishMessage';

export default class UserSignUp {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email, password }: IUserSignUp) {
    const userExist = await this.userRepository.findOne(username);

    if (userExist) {
      throw new BadRequestError('User already registered');
    }

    const id = uuid();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.insert(
      id,
      username,
      email,
      hashedPassword,
    );

    user.type = 'UserCreation';

    await PublishMessage.execute('user', user);

    return {
      status: 201,
      message: 'User registered successfully',
    };
  }
}
