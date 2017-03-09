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
      let agree, neutral, disagree;
      if (numMainPosts.filter( (e) => e._id == "agree").length <= 0){
        agree = 0;
      } else{
        agree = numMainPosts[0].count
      }
      if (numMainPosts.filter( (e) => e._id == "neutral").length <= 0){
        neutral = 0;
      } else{
        neutral = numMainPosts[2].count
      }
      if (numMainPosts.filter( (e) => e._id == "disagree").length <= 0){
        disagree = 0;
      } else{
        disagree = numMainPosts[1].count
      }
      res.json({
        "agree": agree,
        "neutral": neutral,
        "disagree": disagree
      });
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
      let agree, neutral, disagree;
      if (numPosts.filter( (e) => e._id == "agree").length <= 0){
        agree = 0;
      } else{
        agree = numPosts[0].count
      }
      if (numPosts.filter( (e) => e._id == "neutral").length <= 0){
        neutral = 0;
      } else{
        neutral = numPosts[2].count
      }
      if (numPosts.filter( (e) => e._id == "disagree").length <= 0){
        disagree = 0;
      } else{
        disagree = numPosts[1].count
      }
      res.json({
        "agree": agree,
        "neutral": neutral,
        "disagree": disagree
      });
    });
  });
});

//----------------------------------   SERVER LISTEN   ------------------------------------------//

server.listen(8083, () => {
	console.info('listening on port 8083');
});