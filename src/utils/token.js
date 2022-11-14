import jwt from 'jsonwebtoken';
import config from '../configs/app.config.js';

import Logger from './logger.js';
import ForbiddenException from '../exceptions/forbidden.exception.js';

const logger = new Logger('JWT');
const { secret, prefix } = config.auth;

export const generateToken = (payload) => {
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });

  return prefix + token;
};

export const verifyToken = (bearer) => {
  try {
    const token = String(bearer).split(prefix)[1];

    if (!token) {
      throw new ForbiddenException(`Invalid token`);
    }

    return jwt.verify(token, secret);
  } catch (err) {
    logger.error(err.message, err.stack);

    throw new ForbiddenException(err.message);
  }
};
