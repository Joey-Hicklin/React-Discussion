import express from 'express';
import mongoose from 'mongoose';
import Name from './database/schemas/names';
import User from './database/schemas/users';
import Topic from './database/API_functions/topics';
import Post from './database/API_functions/posts';
import Statement from './database/schemas/statements';
import Rating from './database/schemas/ratings';


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let dbToObject = (arr) => {
  let result = {};
  for (var i=0; i<arr.length; i++) {
    result[arr[i]._id] = arr[i].count;
  }
  result.agree = result.agree ? result.agree : 0;
  result.neutral = result.neutral ? result.neutral : 0;
  result.disagree = result.disagree ? result.disagree : 0;
  return result;
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


//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                      TOPICS                                          //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////


server.get('/topics', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    Topic.getRecentTopics( (err, topics) => {
      if(err){
        throw err;
      }
      res.json(topics);
    }, 5);
  });
});

server.get('/topics/:limit', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    Topic.getRecentTopics( (err, topics) => {
      if(err){
        throw err;
      }
      res.json(topics);
    }, parseInt(req.params.limit));
  });
});


server.get('/futuretopics', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    Topic.getFutureTopics( (err, topics) => {
      if(err){
        throw err;
      }
      res.json(topics);
    }, 5);
  });
});

server.get('/futuretopics/:limit', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    Topic.getFutureTopics( (err, topics) => {
      if(err){
        throw err;
      }
      res.json(topics);
    }, parseInt(req.params.limit));
  });
});


//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                      POSTS                                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////


server.get('/posts', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getNumMainPosts( (err, numMainPosts) => {
      if(err){
        throw err;
      }
      res.json( dbToObject(numMainPosts) );
    });
  });
});

server.get('/posts/agree', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getMainPosts( 0, (err, posts) => {
      if(err){
        throw err;
      }
      res.json(posts);
    });
  });
});

server.get('/posts/:statementId/agree', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getPosts( 0, req.params.statementId, (err, posts) => {
      if(err){
        throw err;
      }
      res.json(posts);
    });
  });
});

server.get('/posts/neutral', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getMainPosts( 1, (err, posts) => {
      if(err){
        throw err;
      }
      res.json(posts);
    });
  });
});

server.get('/posts/:statementId/neutral', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getPosts( 1, req.params.statementId, (err, posts) => {
      if(err){
        throw err;
      }
      res.json(posts);
    });
  });
});

server.get('/posts/disagree', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getMainPosts( 2, (err, posts) => {
      if(err){
        throw err;
      }
      res.json(posts);
    });
  });
});

server.get('/posts/:statementId/disagree', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getPosts( 2, req.params.statementId, (err, posts) => {
      if(err){
        throw err;
      }
      res.json(posts);
    });
  });
});

server.get('/posts/:statementId', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getNumPosts( req.params.statementId, (err, numPosts) => {
      if(err){
        throw err;
      }
      res.json( dbToObject(numPosts) );
    });
  });
});

//----------------------------------   SERVER LISTEN   ------------------------------------------//

server.listen(8083, () => {
	console.info('listening on port 8083');
});