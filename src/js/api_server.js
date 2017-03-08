/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "src/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _mongoose = __webpack_require__(2);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _names = __webpack_require__(3);

	var _names2 = _interopRequireDefault(_names);

	var _users = __webpack_require__(4);

	var _users2 = _interopRequireDefault(_users);

	var _topics = __webpack_require__(5);

	var _topics2 = _interopRequireDefault(_topics);

	var _posts = __webpack_require__(6);

	var _posts2 = _interopRequireDefault(_posts);

	var _statements = __webpack_require__(7);

	var _statements2 = _interopRequireDefault(_statements);

	var _ratings = __webpack_require__(8);

	var _ratings2 = _interopRequireDefault(_ratings);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function connectToDb(mongoose) {
	  return new Promise(function (resolve, reject) {
	    if (mongoose.connection.readyState == 0) {
	      mongoose.connect('localhost:27017/nullspeakTEST', function (err) {
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

	var server = (0, _express2.default)();

	server.get('/', function (req, res) {
	  res.send('Hello NullSpeak API');
	});

	server.get('/topics', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _topics2.default.getRecentTopics(function (err, topics) {
	      if (err) {
	        throw err;
	      }
	      res.json(topics);
	    }, 5);
	  });
	});

	server.get('/topics/*', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _topics2.default.getRecentTopics(function (err, topics) {
	      if (err) {
	        throw err;
	      }
	      res.json(topics);
	    }, parseInt(req.path.slice(8)));
	  });
	});

	server.get('/futuretopics', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _topics2.default.getFutureTopics(function (err, topics) {
	      if (err) {
	        throw err;
	      }
	      res.json(topics);
	    }, 5);
	  });
	});

	server.get('/futuretopics/*', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _topics2.default.getFutureTopics(function (err, topics) {
	      if (err) {
	        throw err;
	      }
	      res.json(topics);
	    }, parseInt(req.path.slice(8)));
	  });
	});

	//----------------------------------   SERVER LISTEN   ------------------------------------------//

	server.listen(8083, function () {
	  console.info('listening on port 8083');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildNamesSchema = new Schema({
	  name: String,
	  place: Number
	});

	var Name = mongoose.model('Name', buildNamesSchema);
	exports.default = Name;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildUsersSchema = new Schema({
		name: {
			first: {
				type: Schema.ObjectId,
				ref: "names"
			},
			middle: {
				type: Schema.ObjectId,
				ref: "names"
			},
			last: {
				type: Schema.ObjectId,
				ref: "names"
			}
		},
		rating: {
			averaged: Number,
			last_rating: Date
		},
		posts: {
			main: [{
				type: Schema.ObjectId,
				ref: "posts"
			}],
			responses: [{
				type: Schema.ObjectId,
				ref: "posts"
			}],
			highest: {
				type: Schema.ObjectId,
				ref: "posts"
			}
		}
	});

	var User = mongoose.model('User', buildUsersSchema);

	exports.default = User;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _topics = __webpack_require__(9);

	var _topics2 = _interopRequireDefault(_topics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mongoose = __webpack_require__(2);


	var Topic = module.exports = _topics2.default;

	module.exports.getRecentTopics = function (callback, limit) {
		Topic.find({ 'dates_discussed.0': { $lt: Date.now() } }, callback).sort({ 'dates_discussed.0': -1 }).limit(limit);
	};

	module.exports.getFutureTopics = function (callback, limit) {
		Topic.find({ 'dates_discussed.0': { $gt: Date.now() } }, callback).sort({ 'dates_discussed.0': 1 }).limit(limit);
	};

	exports.default = Topic;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildPostsSchema = new Schema({
	  author: {
	    type: Schema.ObjectId,
	    ref: "users"
	  },
	  date_posted: Date,
	  response_post: {
	    type: Schema.ObjectId,
	    ref: "posts"
	  },
	  response_main: {
	    type: Schema.ObjectId,
	    ref: "topics"
	  },
	  response_in: Number,
	  expiration: Date,
	  overall_rating: Number,
	  statements: [{
	    type: Schema.ObjectId,
	    ref: "statements"
	  }]
	});

	var Post = mongoose.model('Post', buildPostsSchema);
	exports.default = Post;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildStatementsSchema = new Schema({
	  content: String,
	  current: Boolean,
	  has_edits: Boolean,
	  new_edited: {
	    type: Schema.ObjectId,
	    ref: "statements"
	  },
	  edit_origin: {
	    type: Schema.ObjectId,
	    ref: "statements"
	  }
	});

	var Statement = mongoose.model('Statement', buildStatementsSchema);
	exports.default = Statement;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildRatingsSchema = new Schema({
	  statement: {
	    type: Schema.ObjectId,
	    ref: "statements"
	  },
	  WS: [{
	    user: {
	      type: Schema.ObjectId,
	      ref: "users"
	    }
	  }],
	  NH: [{
	    user: {
	      type: Schema.ObjectId,
	      ref: "users"
	    }
	  }],
	  RI: [{
	    user: {
	      type: Schema.ObjectId,
	      ref: "users"
	    }
	  }]
	});

	var Rating = mongoose.model('Ratings', buildRatingsSchema);
	exports.default = Rating;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildTopicsSchema = new Schema({
	    topic: String,
	    dates_discussed: [Date]
	});

	var Topic = mongoose.model('Topics', buildTopicsSchema);
	exports.default = Topic;

/***/ }
/******/ ]);