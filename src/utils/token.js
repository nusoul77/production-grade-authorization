import jwt from 'jsonwebtoken';
import config from '../configs/app.config.js';

import Logger from './logger.js';
import ForbiddenException from '../exceptions/forbidden.exception.js';

const logger = new Logger('JWT');

export const generateToken = (payload) => {
  return jwt.sign(payload, config.auth.secret, { expiresIn: '7d' });
};

export const verifyToken = (bearer) => {
  try {
    const token = String(bearer).split('Bearer_')[1];

    if (!token) {
      throw new ForbiddenException(`Invalid token`);
    }

    return jwt.verify(token, config.auth.secret);
  } catch (err) {
    logger.error(err.message, err.stack);

    throw new ForbiddenException(err.message);
  }
};
