import Logger from './logger.js';

const logger = new Logger('Not Falsy');

export const found = (value) => {
  logger.log(`Checking if value is NULL`, { value });

  return value !== null && value;
};
