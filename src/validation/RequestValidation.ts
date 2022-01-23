import { Request } from 'express';
import { BadRequestError } from '@src/util/error/BadRequestError';

export default class RequestValidation {
  public static async validate(req: Request) {
    try {
      this.paramsValidation(req);
    } catch (error) {
      throw error;
    }
  }

  private static paramsValidation(req: Request) {
    if (req.url === '/signin') {
      if (req.body.username === undefined || req.body.username === '') {
        throw new BadRequestError('Missing username parameter');
      }
      if (req.body.password === undefined || req.body.password === '') {
        throw new BadRequestError('Missing password parameter');
      }
    }

    if (req.url === '/signup') {
      if (req.body.username === undefined || req.body.username === '') {
        throw new BadRequestError('Missing username parameter');
      }

      if (req.body.email === undefined || req.body.email === '') {
        throw new BadRequestError('Missing email parameter');
      }

      if (req.body.password === undefined || req.body.password === '') {
        throw new BadRequestError('Missing password parameter');
      }
    }
  }
}
