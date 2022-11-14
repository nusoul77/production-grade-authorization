import { MongoClient } from 'mongodb';
import moment from 'moment';
import config from '../configs/app.config.js';

import { COLLECTIONS, USER_ROLES } from '../utils/constants.js';
import Logger from '../utils/logger.js';
import { hash } from '../utils/password.js';

const { root, pass, host, port, name } = config.db;

// Creating db connection client
const url = `mongodb://${root}:${pass}@${host}:${port}`;
const client = new MongoClient(url);
const logger = new Logger(MongoClient.name);

// Database transaction
export const connectionWrapper = async (callback, input, collectionName) => {
  async function processConnection() {
    await client.connect();
    logger.log('Connection established');

    const db = client.db(name);

    return db.collection(collectionName);
  }

  return processConnection()
    .then(async (collection) => {
      return await callback(collection, input);
    })
    .catch((err) => {
      throw err;
    })
    .finally(() => {
      logger.log('Connection closed');
      client.close();
    });
};

export const initializeAdmin = async () => {
  async function init() {
    const { email, password } = config.app.admin;

    await client.connect();

    const db = client.db(name);

    const collection = db.collection(COLLECTIONS.USERS);

    const admin = await collection.findOne({ email });

    if (admin) return admin;

    logger.log('Initializing admin', { email, password });

    const timeStamp = moment().toDate();

    return await collection.insertOne({
      email,
      password: hash(password),
      role: USER_ROLES.ADMIN,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    });
  }

  return await init()
    .then((user) => user)
    .catch((err) => err)
    .finally(() => client.close());
};
