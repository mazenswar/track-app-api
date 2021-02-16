const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return;
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'mysecretkey', () => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }
  });
};
