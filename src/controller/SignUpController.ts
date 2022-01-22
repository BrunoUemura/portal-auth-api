import { NextFunction, Request, Response } from 'express';
import UserSignUp from '../core/usecase/user/UserSignUp';
import { PreReqValidation } from '../core/usecase/validation/PreReqValidation';
import UserRepositoryPostgreSQL from '../infra/database/postgres/repository/UserRepositoryPostgreSQL';

export default class SignUpController {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      await PreReqValidation.execute(request);

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
