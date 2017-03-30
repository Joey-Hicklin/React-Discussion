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

	var _database_connect = __webpack_require__(3);

	var _names = __webpack_require__(4);

	var _names2 = _interopRequireDefault(_names);

	var _users = __webpack_require__(5);

	var _users2 = _interopRequireDefault(_users);

	var _topics = __webpack_require__(7);

	var _topics2 = _interopRequireDefault(_topics);

	var _posts = __webpack_require__(9);

	var _posts2 = _interopRequireDefault(_posts);

	var _statements = __webpack_require__(11);

	var _statements2 = _interopRequireDefault(_statements);

	var _ratings = __webpack_require__(12);

	var _ratings2 = _interopRequireDefault(_ratings);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getRandomInt = function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	};

	var dbToObject = function dbToObject(arr) {
	  var result = {};
	  for (var i = 0; i < arr.length; i++) {
	    result[arr[i]._id] = arr[i].count;
	  }
	  result.agree = result.agree ? result.agree : 0;
	  result.neutral = result.neutral ? result.neutral : 0;
	  result.disagree = result.disagree ? result.disagree : 0;
	  return result;
	};

	var server = (0, _express2.default)();

	server.use(function (req, res, next) {
	  res.header("Access-Control-Allow-Origin", "http://localhost:8090");
	  next();
	});

	server.get('/', function (req, res) {
	  res.send('Hello NullSpeak API');
	});

	//////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                      //
	//                                      TOPICS                                          //
	//                                                                                      //
	//////////////////////////////////////////////////////////////////////////////////////////


	server.get('/topic/:date?', function (req, res) {

	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _topics2.default.getTopic(function (err, topic) {
	      if (err) {
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


	server.get('/posts', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getNumMainPosts(function (err, numMainPosts) {
	      if (err) {
	        throw err;
	      }
	      res.json(dbToObject(numMainPosts));
	    });
	  });
	});

	server.get('/posts/agree', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getMainPosts(0, function (err, posts) {
	      if (err) {
	        throw err;
	      }
	      res.json(posts);
	    });
	  });
	});

	server.get('/posts/:statementId/agree', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getPosts(0, req.params.statementId, function (err, posts) {
	      if (err) {
	        throw err;
	      }
	      res.json(posts);
	    });
	  });
	});

	server.get('/posts/neutral', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getMainPosts(1, function (err, posts) {
	      if (err) {
	        throw err;
	      }
	      res.json(posts);
	    });
	  });
	});

	server.get('/posts/:statementId/neutral', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getPosts(1, req.params.statementId, function (err, posts) {
	      if (err) {
	        throw err;
	      }
	      res.json(posts);
	    });
	  });
	});

	server.get('/posts/disagree', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getMainPosts(2, function (err, posts) {
	      if (err) {
	        throw err;
	      }
	      res.json(posts);
	    });
	  });
	});

	server.get('/posts/:statementId/disagree', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getPosts(2, req.params.statementId, function (err, posts) {
	      if (err) {
	        throw err;
	      }
	      res.json(posts);
	    });
	  });
	});

	server.get('/posts/:statementId', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _posts2.default.getNumPosts(req.params.statementId, function (err, numPosts) {
	      if (err) {
	        throw err;
	      }
	      res.json(dbToObject(numPosts));
	    });
	  });
	});

	//////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                      //
	//                                      RATINGS                                         //
	//                                                                                      //
	//////////////////////////////////////////////////////////////////////////////////////////

	server.get('/ratings/post/:postId', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _ratings2.default.getPostRatings(req.params.postId, function (err, ratings) {
	      if (err) {
	        throw err;
	      }
	      res.json(ratings);
	    });
	  });
	});

	server.get('/ratings/statement/:statementId', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _ratings2.default.getStatementRatings(req.params.statementId, function (err, ratings) {
	      if (err) {
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

	server.get('/user/:userId', function (req, res) {
	  (0, _database_connect.connectToDb)(_mongoose2.default).then(function (db) {
	    _users2.default.getUser(req.params.userId, function (err, user) {
	      if (err) {
	        throw err;
	      }
	      res.json(user);
	    });
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
	exports.connectToDb = undefined;

	var _mongoose = __webpack_require__(2);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var connectToDb = exports.connectToDb = function connectToDb(mongoose) {
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
	      resolve(db);
	    }
	  });
	};

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _users = __webpack_require__(6);

	var _users2 = _interopRequireDefault(_users);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mongoose = __webpack_require__(2);


	var User = module.exports = _users2.default;

	module.exports.getUser = function (id, callback) {
		User.findOne({ '_id': id }, callback);
	};

	exports.default = User;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _topics = __webpack_require__(8);

	var _topics2 = _interopRequireDefault(_topics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mongoose = __webpack_require__(2);


	var Topic = module.exports = _topics2.default;

	module.exports.getTopic = function (callback) {
		var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();

		if (isNaN(date)) {
			date = Date.now();
		} else {
			date = new Date(date);
		}
		var endDate = new Date(date - 7 * 24 * 60 * 60 * 1000);
		Topic.find().elemMatch('dates_discussed', { $lte: date, $gte: endDate }).limit(1).exec(callback);
	};

	exports.default = Topic;

/***/ },
/* 8 */
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _posts = __webpack_require__(10);

	var _posts2 = _interopRequireDefault(_posts);

	var _topics = __webpack_require__(8);

	var _topics2 = _interopRequireDefault(_topics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mongoose = __webpack_require__(2);


	var Post = module.exports = _posts2.default;

	module.exports.getNumMainPosts = function (callback) {
		var recentDate = Date.now() - 7 * 24 * 60 * 60 * 1000;
		_topics2.default.findOne({ $and: [{ 'dates_discussed.0': { $lt: Date.now() } }, { 'dates_discussed.0': { $gt: new Date(recentDate) } }] }, function (err, mainTopic) {
			Post.aggregate([{ $match: { response_main: mainTopic._id } }, { $group: {
					_id: {
						$cond: {
							if: { $eq: ["$response_in", 0] }, then: "agree", else: {
								$cond: { if: { $eq: ["$response_in", 1] }, then: "neutral", else: {
										$cond: { if: { $eq: ["$response_in", 2] }, then: "disagree", else: false }
									} }
							}
						}
					},
					count: { $sum: 1 }
				} }, { $sort: { _id: 1 } }], callback);
		});
	};

	module.exports.getNumPosts = function (statementId, callback) {
		var _id = mongoose.Types.ObjectId(statementId);
		Post.aggregate([{ $match: { 'response_statement': _id } }, { $group: {
				_id: {
					$cond: {
						if: { $eq: ["$response_in", 0] }, then: "agree", else: {
							$cond: { if: { $eq: ["$response_in", 1] }, then: "neutral", else: {
									$cond: { if: { $eq: ["$response_in", 2] }, then: "disagree", else: false }
								} }
						}
					}
				},
				count: { $sum: 1 }
			} }, { $sort: { _id: 1 } }], callback);
	};

	module.exports.getMainPosts = function (style, callback) {
		var recentDate = Date.now() - 7 * 24 * 60 * 60 * 1000;
		_topics2.default.findOne({ $and: [{ 'dates_discussed.0': { $lt: Date.now() } }, { 'dates_discussed.0': { $gt: new Date(recentDate) } }] }, function (err, mainTopic) {
			Post.find({ 'response_main': mainTopic._id, 'response_in': style }, callback);
		});
	};

	module.exports.getPosts = function (style, id, callback) {
		Post.find({ 'response_statement': id, 'response_in': style }, callback);
	};

	exports.default = Post;

/***/ },
/* 10 */
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
	  response_statement: {
	    type: Schema.ObjectId,
	    ref: "statements"
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ratings = __webpack_require__(13);

	var _ratings2 = _interopRequireDefault(_ratings);

	var _posts = __webpack_require__(10);

	var _posts2 = _interopRequireDefault(_posts);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mongoose = __webpack_require__(2);


	var Rating = module.exports = _ratings2.default;

	module.exports.getPostRatings = function (id, callback) {
		_posts2.default.findOne({ '_id': id }, function (err, post) {
			Rating.find({ statement: { $in: post.statements } }, callback);
		});
	};

	module.exports.getStatementRatings = function (id, callback) {
		Rating.findOne({ 'statement': id }, callback);
	};

	exports.default = Rating;

/***/ },
/* 13 */
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

/***/ }
/******/ ]);