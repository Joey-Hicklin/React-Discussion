const mongoose = require('mongoose'); // Replace with import as desired
const mongoConnectString = 'mongodb://localhost/database-name-here';

mongoose.connect('127.0.0.1:27017', (err) => {
  if (err) {
    console.log('Err, could not connect to the database.');
  } else {
  	console.log('connected to MONGO');
  }
});