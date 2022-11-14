import ForbiddenException from '../exceptions/forbidden.exception.js';
import { STATUS_CODES, USER_ROLES } from '../utils/constants.js';
import { verifyToken } from '../utils/token.js';

function AdminGuard(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(STATUS_CODES.FORBIDDEN);
    res.send({ message: 'Forbidden', path: req.path });
    return;
  }

  try {
    const { role } = verifyToken(authorization);

    if (role !== USER_ROLES.ADMIN) throw new ForbiddenException(`Forbidden`);
  } catch (exception) {
    res.status(exception.statusCode || 500);
    res.send(exception.statusCode ? exception : { message: 'Internal server error' });
    return;
  }

  next();
}

export default AdminGuard;
