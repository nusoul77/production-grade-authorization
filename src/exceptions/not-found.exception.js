import { STATUS_CODES } from '../utils/constants.js';

class NotFoundException {
  constructor(message) {
    this.message = message;

    return {
      message: this.message,
      statusCode: STATUS_CODES.NOT_FOUND,
    };
  }
}

export default NotFoundException;
