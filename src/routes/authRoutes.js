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

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide emailand password' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Email not found' });
  }
  try {
    await user.comparePasswords(password);
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    res.send({ token });
  } catch (e) {
    return res.status(422).send({ error: 'Invalid Username or Password' });
  }
});

module.exports = router;
