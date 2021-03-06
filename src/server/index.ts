import { configureNodeEnvironmentVariables } from '../../environment/configure.node';
configureNodeEnvironmentVariables();

import express from 'express';

import { API_PORT } from '../constants/port';
import rootApiRouter from './routes/root';
import { connectToDatabaseTypeorm } from './config/typeorm';
import { configureClientServing } from './config/client-serving';
import { configureSwagger } from './config/swagger';

const getExpressApp = () =>
  connectToDatabaseTypeorm().then(async (connection) => {
    await connection.driver.afterConnect();

    console.log('initialized TypeORM');

    const app = express();
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json());

    app.use('/api', rootApiRouter);

    configureSwagger(app);

    configureClientServing(app);

    app.listen(API_PORT, () => console.log(`Listening to ${API_PORT}`));

    return app;
  });

export default getExpressApp;
