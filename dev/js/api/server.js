import express from 'express';
import mongoose from 'mongoose';
import { connectToDb } from './database_connect';
import Name from './database/schemas/names';
import User from './database/API_functions/users';
import Topic from './database/API_functions/topics';
import Post from './database/API_functions/posts';
import Statement from './database/schemas/statements';
import Rating from './database/API_functions/ratings';


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const dbToObject = (arr) => {
  let result = {};
  for (var i=0; i<arr.length; i++) {
    result[arr[i]._id] = arr[i].count;
  }
  result.agree = result.agree ? result.agree : 0;
  result.neutral = result.neutral ? result.neutral : 0;
  result.disagree = result.disagree ? result.disagree : 0;
  return result;
}

var server = express();

server.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8090");
  next();
});

server.get('/', (req, res) => {
	res.send('Hello NullSpeak API');
});


//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                      TOPICS                                          //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////


server.get('/topic/:date?', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    Topic.getTopic( (err, topic) => {
      if(err){
        throw err;
      }
      res.json(topic);
    }, parseInt(req.params.date));
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


//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                      RATINGS                                         //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

server.get('/ratings/post/:postId', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Rating.getPostRatings( req.params.postId, (err, ratings) => {
      if(err){
        throw err;
      }
      res.json(ratings);
    });
  });
});

server.get('/ratings/statement/:statementId', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Rating.getStatementRatings( req.params.statementId, (err, ratings) => {
      if(err){
        throw err;
      }
      res.json(ratings);
    });
  });
});


//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                        USER                                          //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

server.get('/user/:userId', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    User.getUser( req.params.userId, (err, user) => {
      if(err){
        throw err;
      }
      res.json(user);
    });
  });
});

//----------------------------------   SERVER LISTEN   ------------------------------------------//

server.listen(8083, () => {
	console.info('listening on port 8083');
});