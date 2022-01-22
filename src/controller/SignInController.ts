import { NextFunction, Request, Response } from 'express';
import UserSignIn from '../core/usecase/user/UserSignIn';
import { PreReqValidation } from '../core/usecase/validation/PreReqValidation';
import UserRepositoryPostgreSQL from '../infra/database/postgres/repository/UserRepositoryPostgreSQL';

export default class SignInController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await PreReqValidation.execute(request);

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
