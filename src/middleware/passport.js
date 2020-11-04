const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = (req, res, next) => {
  const { url } = req;
  if (url === '/' || url === '/login' || url === '/doc') {
    return next();
  }

  const tokenString = req.headers.authorization;
  if (!tokenString) {
    res.status(401).json({
      message: 'Bad auth'
    });
  }

  const token = tokenString.slice(7);
  const isAuthorized = jwt.verify(token, JWT_SECRET_KEY);
  if (!isAuthorized) {
    res.status(401).json({
      message: 'Bad auth'
    });
  }
  next();
};

