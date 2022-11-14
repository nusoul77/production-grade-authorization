import { ObjectId } from 'mongodb';
import moment from 'moment';

import { connectionWrapper } from './connection.js';
import { COLLECTIONS } from '../utils/constants.js';
import Logger from '../utils/logger.js';

class UserRepository {
  constructor() {
    this.logger = new Logger(UserRepository.name);
  }

  async create(user) {
    const timeStamp = moment().toDate();

    const insertOne = async (connection, input) =>
      await connection.insertOne({ ...input, createdAt: timeStamp, updatedAt: timeStamp });

    return await connectionWrapper(insertOne, user, COLLECTIONS.USERS);
  }

  async findOne(input) {
    const filter = {
      ...input,
    };

    if (input.id) {
      filter._id = new ObjectId(input.id);
      delete filter.id;
    }

    const findOne = async (connection, filter) => await connection.findOne(filter);

    return await connectionWrapper(findOne, filter, COLLECTIONS.USERS);
  }

  async findMany(input) {
    const filter = {
      ...input,
    };

    const findMany = async (connection, filter) => await connection.find(filter).toArray();

    return await connectionWrapper(findMany, filter, COLLECTIONS.USERS);
  }

  async update(userId, update) {
    try {
      const timeStamp = moment().toDate();

      const updateOne = async (connection, input) =>
        await connection.updateOne({ _id: new ObjectId(userId) }, { $set: { ...input, updatedAt: timeStamp } });

      return await connectionWrapper(updateOne, update, COLLECTIONS.USERS);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw err;
    }
  }
}

export default UserRepository;
