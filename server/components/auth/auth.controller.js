import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import User from '../user/user.model';
import config from '../../config/env';

/**
 *  Returns jwt token and user details if valid email is provided
 * @property {string} req.body.email - The email of user.
 * @returns {token, User}
 */
function login(req, res, next) {
  User.getByEmail(req.body.email)
    .then((foundUser) => {
      const token = jwt.sign(foundUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
      });
      return res.json({
        token,
        user: foundUser.safeModel()
      });
    })
    .catch(err => next(new APIError(err.message, httpStatus.NOT_FOUND)));
}

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @returns {User}
 */
function register(req, res, next) {
  const user = new User(req.body);

  User.getByEmail(req.body.email)
    .then((foundUser) => {
      if (foundUser) {
        return Promise.reject(new APIError('Email must be unique', httpStatus.CONFLICT));
      }
      return user.save();
    })
    .then((savedUser) => {
      const token = jwt.sign(savedUser.safeModel(), config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
      });
      return res.json({
        token,
        user: savedUser.safeModel()
      });
    })
    .catch(e => next(e));
}

export default { login, register };
