import { HttpStatusCodes } from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

export class DatabaseConnectionError extends CustomError {
  statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  message = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ status: this.statusCode, message: this.message }];
  }
}
