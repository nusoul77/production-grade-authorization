import { STATUS_CODES } from '../utils/constants.js';

class ForbiddenException {
  constructor(message) {
    this.message = message;

    return {
      message: this.message,
      statusCode: STATUS_CODES.FORBIDDEN,
    };
  }
}

export default ForbiddenException;
