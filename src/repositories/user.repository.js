import { connectionWrapper } from './connection.js';
import { COLLECTIONS } from '../utils/constants.js';
import Logger from '../utils/logger.js';

class UserRepository {
  constructor() {
    this.logger = new Logger(UserRepository.name);
  }

  async create(user) {
    this.logger.log(`Inserting user`, user);

    const insertOne = async (connection, input) => await connection.insertOne(input);

    return await connectionWrapper(insertOne, user, COLLECTIONS.USERS);
  }

  async findOne(filter) {
    this.logger.log(`Searching user`, filter);

    const findOne = async (connection, input) => await connection.findOne(input);

    return await connectionWrapper(findOne, filter, COLLECTIONS.USERS);
  }
}

export default UserRepository;
