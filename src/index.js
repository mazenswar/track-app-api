require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
const mongoUri =
  'mongodb+srv://admin:ma03031@cluster0.choyt.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongooo');
});

mongoose.connection.on('error', (error) => {
  console.log('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('Holaaa Pendejo');
});

app.listen(3000, () => {
  console.log('Somebody is watching meeeee 3000');
});
