import { configureNodeEnvironmentVariables } from '../../environment/configure.node';
configureNodeEnvironmentVariables();

import express from 'express';

import { API_PORT } from '../constants/port';
import rootApiRouter from './routes/root';
import { connectToDatabaseTypeorm } from './config/typeorm';

connectToDatabaseTypeorm().then(async (connection) => {
  await connection.driver.afterConnect();

  console.log('initialized TypeORM');

  const app = express();

  app.use(express.json());

  app.use('/api', rootApiRouter);

  app.listen(API_PORT, () => console.log(`Listening to ${API_PORT}`));
});
