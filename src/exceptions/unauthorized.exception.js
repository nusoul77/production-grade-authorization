import { STATUS_CODES } from '../utils/constants.js';

class UnauthorizedException {
  constructor(message) {
    this.message = message;

    return {
      message: this.message,
      statusCode: STATUS_CODES.UNAUTHORIZED,
    };
  }
}

export default UnauthorizedException;
