const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const express = require('express');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.send({ token });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

module.exports = router;
