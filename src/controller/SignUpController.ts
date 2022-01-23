import { NextFunction, Request, Response } from 'express';
import RequestValidation from '@src/validation/RequestValidation';
import UserSignUp from '@src/core/usecase/user/UserSignUp';
import UserRepositoryPostgreSQL from '@src/infra/database/postgres/repository/UserRepositoryPostgreSQL';

export default class SignUpController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await RequestValidation.validate(request);

      const { username, email, password } = request.body;
      const userRepositoryPostgreSQL = new UserRepositoryPostgreSQL();
      const userSignUp = new UserSignUp(userRepositoryPostgreSQL);
      const result = await userSignUp.execute({
        username,
        email,
        password,
      });
      return response.json(result);
    } catch (error) {
      next(error);
    }
  }
}
