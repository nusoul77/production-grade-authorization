import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './constants.js';
import UnauthorizedException from '../exceptions/unauthorized.exception.js';

export const hash = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  return bcrypt.hashSync(password, salt);
};

export const compare = async (password, hash) => {
  const same = await bcrypt.compare(password, hash);

  if (!same) {
    throw new UnauthorizedException(`Incorrect password`);
  }
};
