require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const mongoUri = require('../ENV');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongooo');
});

mongoose.connection.on('error', (error) => {
  console.log('Error connecting to mongo', error);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Holaaa Pendejo  ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Somebody is watching meeeee 3000');
});
