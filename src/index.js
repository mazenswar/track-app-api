const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoUri =
  'mongodb+srv://admin:ma03031@cluster0.choyt.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongooo');
});

app.get('/', (req, res) => {
  res.send('Holaaa Pendejo');
});

app.listen(3000, () => {
  console.log('Somebody is watching meeeee 3000');
});
