const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errModule = require('../errors/handleError');

module.exports = (req, res, next) => {
  console.log('пошла проверка токена в back auth.js');
  const { token } = req.cookies;
  console.log('А вот это токен', token);
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(errModule.handleError(err, res));
    throw new UnauthorizedError('Необходима авторизация!');
  }
  req.user = payload;
  return next();
};
