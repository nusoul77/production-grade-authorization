import { STATUS_CODES } from '../utils/constants.js';
import isCorrectEmail from '../utils/email.js';

function RegisterValidation(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'Please provide email, password, first and last name to register a user' });
    return;
  }

  if (password.length < 8) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'Password is too short' });
    return;
  }

  if (firstName.length < 3) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'First name is too short' });
    return;
  }

  if (lastName.length < 2) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'Last name is too short' });
    return;
  }

  if (!isCorrectEmail(email)) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'Email should be email' });
    return;
  }

  next();
}

export default RegisterValidation;
