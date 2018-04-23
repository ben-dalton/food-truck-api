import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import Account from '../models/account';
import appConfig from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export const accountController = ({ config, db }) => {
  const api = Router();

  // '/v1/account'
  api.get('/', authenticate, (req, res) => {
    res.status(200).json(req.user);
  });

  // '/v1/account/register'
  api.post('/register', (req, res) => {
    Account.register(new Account({ username: req.body.email }), req.body.password, (
      err,
      account
    ) => {
      if (err) {
        return res.status(500).send(`An error occurred: ${err}`);
      }
      passport.authenticate('local', {
        session: false,
      })(req, res, () => {
        res.status(200).send('Successfully created new account');
      });
    });
  });

  // '/v1/account/login'
  api.post(
    '/login',
    passport.authenticate('local', {
      session: false,
      scope: [],
    }),
    generateAccessToken,
    respond
  );

  // '/v1/account/logout'
  api.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
  });

  return api;
};
