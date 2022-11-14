import { STATUS_CODES } from '../utils/constants.js';

class ConflictException {
  constructor(message) {
    this.message = message;

    return {
      message: this.message,
      statusCode: STATUS_CODES.CONFLICT,
    };
  }
}

export default ConflictException;
