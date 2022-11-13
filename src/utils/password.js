import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './constants.js';

export const hash = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);

  return bcrypt.hashSync(password, salt);
};
