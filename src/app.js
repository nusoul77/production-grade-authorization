import express from 'express';
import { MongoServerSelectionError } from 'mongodb';
import bodyParser from 'body-parser';
import config from './configs/app.config.js';

import authRouter from './routers/auth.router.js';
import usersRouter from './routers/users.router.js';
import { initializeAdmin } from './repositories/connection.js';
import Logger from './utils/logger.js';

const app = express();
const logger = new Logger(`Server`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRouter);
app.use(usersRouter);

initializeAdmin()
  .then((user) => {
    if (!user || user instanceof MongoServerSelectionError) {
      throw new Error(`Admin wasn't created or found`);
    }

    app.listen(config.app.port, () => {
      logger.log('Server is running...');
    });
  })
  .catch((err) => {
    logger.error(err.message, err.stack);
  });
