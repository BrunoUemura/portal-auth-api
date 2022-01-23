import { NextFunction, Request, Response } from 'express';
import RequestValidation from '@src/validation/RequestValidation';
import UserSignIn from '@src/core/usecase/user/UserSignIn';
import UserRepositoryPostgreSQL from '@src/infra/database/postgres/repository/UserRepositoryPostgreSQL';

export default class SignInController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await RequestValidation.validate(request);

      const { username, password } = request.body;
      const userRepositoryPostgreSQL = new UserRepositoryPostgreSQL();
      const userSignIn = new UserSignIn(userRepositoryPostgreSQL);
      const result = await userSignIn.execute({
        username,
        password,
      });
      return response.json(result);
    } catch (error) {
      next(error);
    }
  }
}
