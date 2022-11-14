import { ObjectId } from 'mongodb';
import moment from 'moment';

import { connectionWrapper } from './connection.js';
import { COLLECTIONS } from '../utils/constants.js';

class UserRepository {
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

  // TODO:
  async update(userId, user) {
    const timeStamp = moment().toDate();

    const updateOne = async (connection, input) => await connection.updateOne({ ...input, updatedAt: timeStamp });

    return await connectionWrapper(updateOne, user, COLLECTIONS.USERS);
  }

  // TODO:
  async delete(userId) {
    const timeStamp = moment().toDate();

    const input = { isDeleted: true };

    const updateOne = async (connection, input) => await connection.updateOne({ ...input, updatedAt: timeStamp });

    return await connectionWrapper(updateOne, input, COLLECTIONS.USERS);
  }
}

export default UserRepository;
