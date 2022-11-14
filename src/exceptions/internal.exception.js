import { STATUS_CODES } from '../utils/constants.js';

class InternalException {
  constructor(message = `Internal server error`) {
    this.message = message;

    return {
      message: this.message,
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    };
  }
}

export default InternalException;
