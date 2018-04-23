import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import { truckController, accountController } from '../controllers/';

const routes = express();

// connect to db
initializeDb((db) => {
  // internal middleware
  routes.use(middleware({ config, db }));

  // api routes v1 (/v1)
  routes.use('/trucks', truckController({ config, db }));
  routes.use('/account', accountController(config, db));
});

export default routes;
