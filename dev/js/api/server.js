import express from 'express';
import mongoose from 'mongoose';
import Name from './database/schemas/names';
import User from './database/schemas/users';
import Topic from './database/API_functions/topics';
import Post from './database/schemas/posts';
import Statement from './database/schemas/statements';
import Rating from './database/schemas/ratings';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function connectToDb(mongoose){
  return new Promise(function(resolve, reject){
    if (mongoose.connection.readyState == 0){
      mongoose.connect('localhost:27017/nullspeakTEST', (err) => {
        if (err) {
          console.log('Err, could not connect to the database.');
          reject();
        } else {
          let db = mongoose.connection;
          console.log('connected to MONGO');
          resolve(db);
        }
      });
    } else {
      let db = mongoose.connection;
      console.log('still connected to MONGO...');
      resolve(db);
    }
  });
}

var server = express();

server.get('/', (req, res) => {
	res.send('Hello NullSpeak API');
});

server.get('/topics', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    //check req data for specific topic request, if none --> check local storage for current topic, if none --> fetch current main topic
    Topic.getRecentTopics( (err, topics) => {
      if(err){
        throw err;
      }
      res.json(topics);
    }, 5);
  });
});

server.get('/topics/*', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    //check req data for specific topic request, if none --> check local storage for current topic, if none --> fetch current main topic
    Topic.getRecentTopics( (err, topics) => {
      if(err){
        throw err;
      }
      res.json(topics);
    }, parseInt(req.path.slice(8)));
  });
});




//----------------------------------   SERVER LISTEN   ------------------------------------------//

server.listen(8083, () => {
	console.info('listening on port 8083');
});