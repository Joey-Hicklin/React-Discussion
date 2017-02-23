import express from 'express';
import mongoose from 'mongoose';
import Name from './database/schemas/names';
import User from './database/schemas/users';
import Topic from './database/schemas/topics';
import Post from './database/schemas/posts';
import Statement from './database/schemas/statements';
import names from './database/test_data/names';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function connectToDb(mongoose){
  mongoose.connect('localhost:27017/nullspeakTEST', (err) => {
    if (err) {
      console.log('Err, could not connect to the database.');
    } else {
      var db = mongoose.connection;
      console.log('connected to MONGO');
    }
  });
}

var server = express();

server.get('/', (req, res) => {
	res.send('Hello NullSpeak');
});

server.get('/build', (req, res) => {

  res.send('Which dB piece are we building?');
});


//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      NAMES                                               //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/names', (req, res) => {

  connectToDb(mongoose);

 
  function BuildName(nameArray, place){
    for (var i = nameArray.length - 1; i >= 0; i--) {
      var newName = new Name({
        name: nameArray[i],
        place: place
      });
      newName.save(function (err, newName) {
        if (err) return console.error(err);
        console.log(newName.name, " has been saved to the test Db in place ", place, " with an ID of ", newName._id);
      });
    }
  }

  BuildName(names.first, 0);
  BuildName(names.middle, 1);
  BuildName(names.last, 2);

  res.send('Building the NAMES dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      USERS                                               //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//


server.get('/build/users', (req, res) => {

  connectToDb(mongoose);

  let pickName = function(array, fullName=[]){
    return new Promise(function(resolve, reject){
      let namePlace = getRandomInt(0,array.length);
      let name = array[namePlace];
      Name.findOne({name: name},'name', function(err, selected){
        fullName.push(selected._id);
        resolve(fullName);
      });
    });
  }

  for (var i = 10 - 1; i >= 0; i--) {
    let middleNum = getRandomInt(1,10);

    if (middleNum == 1){
      pickName(names.first).then(function(result){
        return pickName(names.middle, result);
      }).then(function(result){
        return pickName(names.last, result);
      }).then(function(result){
        var newUser = new User({
          name : {
            first : result[0],
            middle : result[1],
            last : result[2]
          }
        });
        newUser.save(function (err, newUser) {
          if (err) return console.error(err);
        });
      });
    } 
    else {
      pickName(names.first).then(function(result){
        return pickName(names.last, result);
      }).then(function(result){
        var newUser = new User({
          name : {
            first : result[0],
            last : result[1]
          }
        });
        newUser.save(function (err, newUser) {
          if (err) return console.error(err);
        });
      });
    }
    
  }

  res.send('Building the USERS dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      TOPICS                                              //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/topics', (req, res) => {

  

  res.send('Building the TOPICS dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      POSTS                                               //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/posts', (req, res) => {

  

  res.send('Building the POSTS dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      STATEMENTS                                          //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/statements', (req, res) => {

  

  res.send('Building the STATEMENTS dB...');
});


server.get('/api', (req, res) => {
	var db = mongoose.connection;
	res.send(JSON.stringify(db));
});

server.listen(8082, () => {
	console.info('listening on port 8082');
});