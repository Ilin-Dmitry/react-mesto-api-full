const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errModule = require('../errors/handleError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log('NODE_ENV from auth.js => ', NODE_ENV);
  console.log('JWT_SECRET from auth.js => ', JWT_SECRET);
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(errModule.handleError(err, res));
    throw new UnauthorizedError('Необходима авторизация!');
  }
  req.user = payload;
  return next();
};
