import { STATUS_CODES } from '../utils/constants.js';
import { verifyToken } from '../utils/token.js';

function AuthorizationGuard(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(STATUS_CODES.FORBIDDEN);
    res.send({ message: 'Forbidden', path: req.path });
    return;
  }

  try {
    verifyToken(authorization);
  } catch (exception) {
    res.status(exception.statusCode || 500);
    res.send(exception.statusCode ? exception : { message: 'Internal server error' });
    return;
  }

  next();
}

export default AuthorizationGuard;
