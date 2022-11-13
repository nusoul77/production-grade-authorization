import { STATUS_CODES } from '../utils/constants.js';
import isCorrectEmail from '../utils/email.js';

function LoginValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'Please provide email and password to login' });
    return;
  }

  if (!isCorrectEmail(email)) {
    res.status(STATUS_CODES.BAD_REQUEST);
    res.send({ message: 'Email should be email' });
    return;
  }

  next();
}

export default LoginValidation;
