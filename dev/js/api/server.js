import express from 'express';
import mongoose from 'mongoose';
import { connectToDb } from './database_connect';
import Name from './database/schemas/names';
import User from './database/API_functions/users';
import Topic from './database/API_functions/topics';
import Post from './database/API_functions/posts';


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
    Topic.getTopicByDate( (err, topic) => {
      if(err){
        throw err;
      }
      res.json(topic);
      mongoose.connection.close();
    }, req.params.date);
  });
});

server.get('/topic/:flag/:ID', (req, res) => {

  connectToDb(mongoose).then( (db) => {
    if(req.params.flag === 't'){
      Topic.getTopicByShortID( (err, topic) => {
        if(err){
          throw err;
        }
        res.json(topic);
        mongoose.connection.close();
      }, req.params.ID);
    }else if(req.params.flag === 'p'){
      Topic.getPostByID( (err, post) => {
        if(err){
          throw err;
        }
        res.json(post);
        mongoose.connection.close();
      }, req.params.ID);
    }else{ // TODO send error code
      res.send('<p>Invalid API endpoint. After \'/topic\' you must include either a \'/p/\' or a \'/t/\' to signal either a post ID or topic ID respectively.</p>');
    }
    
  });
});


//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//                                      POSTS                                           //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////


server.get('/posts/t/:topicId', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getPosts( true, req.params.topicId, req.query, (err, DbResponse) => {
      if(err){
        throw err;
      }
      if(Object.keys(req.query).length === 0 || (req.query.style < 3 && req.query.sort < 11 && req.query.day < 7 && req.query.time < 24)){
        if(Object.keys(req.query).length === 0){
          res.json( dbToObject(DbResponse) );
        }else{
          res.json(DbResponse);
        }
      }      
      mongoose.connection.close();
    });
  });
});

server.get('/posts/:statementId', (req, res) => {
  connectToDb(mongoose).then( (db) => {
    Post.getPosts( false, req.params.statementId, req.query, (err, DbResponse) => {
      if(err){
        throw err;
      }
      if(Object.keys(req.query).length === 0 || (req.query.style < 3 && req.query.sort < 11 && req.query.day < 7 && req.query.time < 24)){
        if(Object.keys(req.query).length === 0){
          res.json( dbToObject(DbResponse) );
        }else{
          res.json(DbResponse);
        }
      }      
      mongoose.connection.close();
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
      mongoose.connection.close();
    });
  });
});

//----------------------------------   SERVER LISTEN   ------------------------------------------//

server.listen(8083, () => {
	console.info('API server listening on port 8083');
});