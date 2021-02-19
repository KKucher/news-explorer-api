const jwt = require('jsonwebtoken');
const yn = require('yn');
const User = require('../models/user');
const { cryptHash } = require('../utils/crypt');
const NotFoundError = require('../errors/NotFoundError');
const { JWT_SECRET, COOKIES_SECURE, COOKIES_SAMESITE } = require('../config/config');
const {
  notFoundUserErrorMessage, registrationOkMessage, logoutOkMessage,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user)
    .orFail(new NotFoundError(notFoundUserErrorMessage))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.init()
    .then(() => {
      cryptHash(password)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then(() => res.status(201).send({ message: registrationOkMessage }))
        .catch(next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: COOKIES_SAMESITE,
        secure: yn(COOKIES_SECURE),
        httpOnly: yn(COOKIES_SECURE),
      });
      res.send({ name: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      sameSite: COOKIES_SAMESITE,
      secure: yn(COOKIES_SECURE),
      httpOnly: yn(COOKIES_SECURE),
    });
    res.send({ message: logoutOkMessage });
  } catch (err) {
    next(err);
  }
};
