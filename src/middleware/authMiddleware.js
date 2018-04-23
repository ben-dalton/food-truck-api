import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const DAY = 60 * 60 * 24;
const TOKEN_TIME = 30 * DAY;
const SECRET = 'W3Hav3Th3Kn0wH0w5';

export const authenticate = expressJwt({ secret: SECRET });

export const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign(
    {
      id: req.user.id,
    },
    SECRET,
    {
      expiresIn: TOKEN_TIME,
    }
  );
  next();
};

export const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token,
  });
};
