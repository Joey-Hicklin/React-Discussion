import express from 'express';
import mongoose from 'mongoose';
import Name from './database/schemas/names';
import User from './database/schemas/users';
import Topic from './database/schemas/topics';
import Post from './database/schemas/posts';
import Statement from './database/schemas/statements';
import Rating from './database/schemas/ratings';
import names from './database/test_data/names';
import sIpsum from './database/test_data/statement_ipsum';
import moment from 'moment';


const date = Date.now();

let weekStart = new Date(date);
weekStart = new Date(weekStart.setDate(weekStart.getDate()-weekStart.getDay()+1));
weekStart = weekStart.setHours(0,0,0,0);

const endDate = new Date(date-7*24*60*60*1000);
const weekEnd = new Date((weekStart+7*24*60*60*1000)-1);

Number.prototype.toBase = function (base) {
    var symbols = 
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var decimal = this;
    var conversion = "";

    if (base > symbols.length || base <= 1) {
        return false;
    }

    while (decimal >= 1) {
        conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] + conversion;
        decimal = Math.floor(decimal / base);
    }

    return (base < 11) ? parseInt(conversion) : conversion;
}

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
          var db = mongoose.connection;
          console.log('connected to MONGO');
          resolve(db);
        }
      });
    } else {
      var db = mongoose.connection;
      console.log('still connected to MONGO...');
      resolve(db);
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

  connectToDb(mongoose).then( (db) => {
    console.log('NAMES ACCESSED')
 
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
  });

  res.send('Building the NAMES dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      USERS                                               //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//


server.get('/build/users', (req, res) => {

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

  connectToDb(mongoose).then( (db) => {
    console.log('USERS ACCESSED');
    for (var i = 20 - 1; i >= 0; i--) {
      let middleNum = getRandomInt(1,10);

      if (middleNum == 1){
        pickName(names.first)
        .then( (result) => { return pickName(names.middle, result) })
        .then( (result) => { return pickName(names.last, result) })
        .then( (result) => {
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
        pickName(names.first)
        .then( (result) => { return pickName(names.last, result) })
        .then( (result) => {
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
  });

  res.send('Building the USERS dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD      TOPICS                                              //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/topics', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    console.log('TOPICS ACCESSED')

    let i,j;
    for (i = 1, j=(weekStart - 150*7*24*60*60*1000); i <= 400; i++, j=j + 7*24*60*60*1000) {

        let newTopic = new Topic({
          content : "Test Topic " + i.toString(),
          short_id: i.toBase(62).padStart(2, "0"),
          dates_discussed : [new Date(j)]
        });
        newTopic.save(function (err, newTopic) {
          if (err) return console.error(err);
        });
    }
  });

  res.send('Building the TOPICS dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD   MAIN   POSTS                                           //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/mainposts', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    Topic.find().elemMatch('dates_discussed', {$lte: date, $gte: endDate}).limit(1)
    .exec((err, topic) => {
      User.count({}, (err, c) => {
        User.find({}, '_id', (err, user) => {

          for (var j = c - 1; j >= 0; j--) {
            let datePosted1 = getRandomInt(weekStart, (weekStart + 5*24*60*59*1000));
            let datePosted2 = getRandomInt((datePosted1 + 2*24*60*60*1000), (weekStart + 7*24*60*60*1000));

            for (var i = 1; i <= 2; i++) {
              let responseIn = getRandomInt(0,3);
              let datePosted = i==1 ? datePosted1 : datePosted2;

              let newMainPost = new Post({
                author : user[j],
                date_posted : new Date(datePosted),
                response_main : topic[0]._id,
                response_in : responseIn,
                expiration : weekEnd
              });
              newMainPost.save( (err, newPost) => {
                if (err) return console.error(err);

                let sNum = getRandomInt(0,5);
                for (var i = 0; i <= sNum; i++) {
                  let content = sIpsum.slice(0, getRandomInt(50,352));
                  let newStatement = new Statement({
                    content : content,
                    expiration : weekEnd
                  });
                  newStatement.save( (err, statement) => {
                    if (err) return console.error(err);

                    let newRating = new Rating({
                      statement: statement._id
                    });
                    newRating.save( (err, rating) => {
                      if (err) return console.error(err);

                      let conditions = { _id : newPost._id };
                      let update = { $addToSet : { statements : statement._id }};  
                      Post.findOneAndUpdate(conditions, update, (err, filledPost) => {
                        if (err) return console.error(err);
                      });
                    });
                  });
                }
              });
            }
          }
        });
      });
    });
  });

  res.send('Building the MAIN POSTS dB...');
});



//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD    POSTS                                                 //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/posts', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    User.find({}, '_id', (err, users) => {
      if (err) return console.error(err);

      for (var i = 100 - 1; i >= 0; i--) {
        Statement.find({
          expiration: weekEnd
        })
        .exec( (err, statements) => {
          if (err) return console.error(err);
        
          for (var i = 40 - 1; i >= 0; i--) {
            let author = users[getRandomInt(0,users.length)]._id;
            let thisStatement = statements[getRandomInt(0,statements.length)];

            let newPost = new Post({
              author : author,
              date_posted : new Date(getRandomInt(date.valueOf(), endDate.valueOf())), // TODO: alter date to compensate for post time
              response_statement : thisStatement._id,
              response_in : getRandomInt(0,3),
              expiration : weekEnd
            });
            newPost.save( (err, post) => {
              if (err) return console.error(err);

              let sNum = getRandomInt(0,5);
              for (var i = 0; i <= sNum; i++) {
                let content = sIpsum.slice(0, getRandomInt(50,352));
                let newStatement = new Statement({
                  content : content,
                  expiration : weekEnd
                });
                newStatement.save( (err, statement) => {
                  if (err) return console.error(err);

                  let newRating = new Rating({
                    statement: statement._id
                  });
                  newRating.save( (err, rating) => {
                    if (err) return console.error(err);

                    let conditions = { _id : newPost._id };
                    let update = { $addToSet : { statements : statement._id }};  
                    Post.findOneAndUpdate(conditions, update, (err, filledPost) => {
                      if (err) return console.error(err);
                    });
                  });
                });
              }
            });
          }
        });
      }
    });
  });

  res.send('Building the POSTS dB...');
});


//-----------------------------------------------------------------------------------------------//
//                                                                                               //
//                                BUILD    RATINGS                                               //
//                                                                                               //
//-----------------------------------------------------------------------------------------------//

server.get('/build/ratings', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    User.find({}, '_id', (err, users) => {
      Statement.find({}, '_id', (err, statements) => {
        for (var i = users.length - 1; i >= 0; i--) {
          let user = users[i]._id;
          let rated = [];
          for (var j = 300 - 1; j >= 0; j--) {
            let ratedStatement = statements[getRandomInt(0,statements.length)]._id;
            if(!rated.includes(ratedStatement)){
              let rateSide = getRandomInt(0,3);
              let update = {};

              switch(rateSide){
                case 0:
                  update = {$push: {WS: {user: user}}};
                  break;
                case 1:
                  update = {$push: {NH: {user: user}}};
                  break;
                case 2:
                  update = {$push: {RI: {user: user}}};
                  break;
              }
              let updateConfig = {safe: true, upsert: true, new : true};
              Rating.findOneAndUpdate( {statement:ratedStatement}, update, updateConfig, (err, completed) => {
                if (err) return console.error(err);
              });
              rated.push(ratedStatement);
            }
          }
        }
      });
    });
  });

  res.send('Inserting RATINGS...');
});

//----------------------------------   SERVER LISTEN   ------------------------------------------//

server.listen(8082, () => {
	console.info('listening on port 8082');
});