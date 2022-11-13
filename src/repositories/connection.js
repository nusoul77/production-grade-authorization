import { MongoClient } from 'mongodb';
import config from '../configs/app.config.js';
import Logger from '../utils/logger.js';

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
