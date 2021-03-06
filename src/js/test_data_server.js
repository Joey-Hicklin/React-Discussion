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

	var _names3 = __webpack_require__(9);

	var _names4 = _interopRequireDefault(_names3);

	var _statement_ipsum = __webpack_require__(10);

	var _statement_ipsum2 = _interopRequireDefault(_statement_ipsum);

	var _moment = __webpack_require__(11);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var date = Date.now();

	var weekStart = new Date(date);
	weekStart = new Date(weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1));
	weekStart = weekStart.setHours(0, 0, 0, 0);

	var endDate = new Date(date - 7 * 24 * 60 * 60 * 1000);
	var weekEnd = new Date(weekStart + 7 * 24 * 60 * 60 * 1000 - 1);

	Number.prototype.toBase = function (base) {
	  var symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	  var decimal = this;
	  var conversion = "";

	  if (base > symbols.length || base <= 1) {
	    return false;
	  }

	  while (decimal >= 1) {
	    conversion = symbols[decimal - base * Math.floor(decimal / base)] + conversion;
	    decimal = Math.floor(decimal / base);
	  }

	  return base < 11 ? parseInt(conversion) : conversion;
	};

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
	  res.send('Hello NullSpeak');
	});

	server.get('/build', function (req, res) {
	  res.send('Which dB piece are we building?');
	});

	//-----------------------------------------------------------------------------------------------//
	//                                                                                               //
	//                                BUILD      NAMES                                               //
	//                                                                                               //
	//-----------------------------------------------------------------------------------------------//

	server.get('/build/names', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    console.log('NAMES ACCESSED');

	    function BuildName(nameArray, place) {
	      for (var i = nameArray.length - 1; i >= 0; i--) {
	        var newName = new _names2.default({
	          name: nameArray[i],
	          place: place
	        });
	        newName.save(function (err, newName) {
	          if (err) return console.error(err);
	          console.log(newName.name, " has been saved to the test Db in place ", place, " with an ID of ", newName._id);
	        });
	      }
	    }

	    BuildName(_names4.default.first, 0);
	    BuildName(_names4.default.middle, 1);
	    BuildName(_names4.default.last, 2);
	  });

	  res.send('Building the NAMES dB...');
	});

	//-----------------------------------------------------------------------------------------------//
	//                                                                                               //
	//                                BUILD      USERS                                               //
	//                                                                                               //
	//-----------------------------------------------------------------------------------------------//


	server.get('/build/users', function (req, res) {

	  var pickName = function pickName(array) {
	    var fullName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	    return new Promise(function (resolve, reject) {
	      var namePlace = getRandomInt(0, array.length);
	      var name = array[namePlace];
	      _names2.default.findOne({ name: name }, 'name', function (err, selected) {
	        fullName.push(selected._id);
	        resolve(fullName);
	      });
	    });
	  };

	  connectToDb(_mongoose2.default).then(function (db) {
	    console.log('USERS ACCESSED');
	    for (var i = 20 - 1; i >= 0; i--) {
	      var middleNum = getRandomInt(1, 10);

	      if (middleNum == 1) {
	        pickName(_names4.default.first).then(function (result) {
	          return pickName(_names4.default.middle, result);
	        }).then(function (result) {
	          return pickName(_names4.default.last, result);
	        }).then(function (result) {
	          var newUser = new _users2.default({
	            name: {
	              first: result[0],
	              middle: result[1],
	              last: result[2]
	            }
	          });
	          newUser.save(function (err, newUser) {
	            if (err) return console.error(err);
	          });
	        });
	      } else {
	        pickName(_names4.default.first).then(function (result) {
	          return pickName(_names4.default.last, result);
	        }).then(function (result) {
	          var newUser = new _users2.default({
	            name: {
	              first: result[0],
	              last: result[1]
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

	server.get('/build/topics', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    console.log('TOPICS ACCESSED');

	    var i = void 0,
	        j = void 0;
	    for (i = 1, j = weekStart - 150 * 7 * 24 * 60 * 60 * 1000; i <= 400; i++, j = j + 7 * 24 * 60 * 60 * 1000) {

	      var newTopic = new _topics2.default({
	        content: "Test Topic " + i.toString(),
	        short_id: i.toBase(62).padStart(2, "0"),
	        dates_discussed: [new Date(j)]
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

	server.get('/build/mainposts', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _topics2.default.find().elemMatch('dates_discussed', { $lte: date, $gte: endDate }).limit(1).exec(function (err, topic) {
	      _users2.default.count({}, function (err, c) {
	        _users2.default.find({}, '_id', function (err, user) {

	          for (var j = c - 1; j >= 0; j--) {
	            var datePosted1 = getRandomInt(weekStart, weekStart + 5 * 24 * 60 * 59 * 1000);
	            var datePosted2 = getRandomInt(datePosted1 + 2 * 24 * 60 * 60 * 1000, weekStart + 7 * 24 * 60 * 60 * 1000);

	            for (var i = 1; i <= 2; i++) {
	              var responseIn = getRandomInt(0, 3);
	              var datePosted = i == 1 ? datePosted1 : datePosted2;

	              var newMainPost = new _posts2.default({
	                author: user[j],
	                date_posted: new Date(datePosted),
	                response_main: topic[0]._id,
	                response_in: responseIn,
	                expiration: weekEnd
	              });
	              newMainPost.save(function (err, newPost) {
	                if (err) return console.error(err);

	                var sNum = getRandomInt(0, 5);
	                for (var i = 0; i <= sNum; i++) {
	                  var content = _statement_ipsum2.default.slice(0, getRandomInt(50, 352));
	                  var newStatement = new _statements2.default({
	                    content: content,
	                    expiration: weekEnd
	                  });
	                  newStatement.save(function (err, statement) {
	                    if (err) return console.error(err);

	                    var newRating = new _ratings2.default({
	                      statement: statement._id
	                    });
	                    newRating.save(function (err, rating) {
	                      if (err) return console.error(err);

	                      var conditions = { _id: newPost._id };
	                      var update = { $addToSet: { statements: statement._id } };
	                      _posts2.default.findOneAndUpdate(conditions, update, function (err, filledPost) {
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

	server.get('/build/posts', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _users2.default.find({}, '_id', function (err, users) {
	      if (err) return console.error(err);

	      for (var i = 100 - 1; i >= 0; i--) {
	        _statements2.default.find({
	          expiration: weekEnd
	        }).exec(function (err, statements) {
	          if (err) return console.error(err);

	          var _loop = function _loop() {
	            var author = users[getRandomInt(0, users.length)]._id;
	            var thisStatement = statements[getRandomInt(0, statements.length)];

	            var newPost = new _posts2.default({
	              author: author,
	              date_posted: new Date(getRandomInt(date.valueOf(), endDate.valueOf())), // TODO: alter date to compensate for post time
	              response_statement: thisStatement._id,
	              response_in: getRandomInt(0, 3),
	              expiration: weekEnd
	            });
	            newPost.save(function (err, post) {
	              if (err) return console.error(err);

	              var sNum = getRandomInt(0, 5);
	              for (var i = 0; i <= sNum; i++) {
	                var content = _statement_ipsum2.default.slice(0, getRandomInt(50, 352));
	                var newStatement = new _statements2.default({
	                  content: content,
	                  expiration: weekEnd
	                });
	                newStatement.save(function (err, statement) {
	                  if (err) return console.error(err);

	                  var newRating = new _ratings2.default({
	                    statement: statement._id
	                  });
	                  newRating.save(function (err, rating) {
	                    if (err) return console.error(err);

	                    var conditions = { _id: newPost._id };
	                    var update = { $addToSet: { statements: statement._id } };
	                    _posts2.default.findOneAndUpdate(conditions, update, function (err, filledPost) {
	                      if (err) return console.error(err);
	                    });
	                  });
	                });
	              }
	            });
	          };

	          for (var i = 40 - 1; i >= 0; i--) {
	            _loop();
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

	server.get('/build/ratings', function (req, res) {

	  connectToDb(_mongoose2.default).then(function (db) {
	    _users2.default.find({}, '_id', function (err, users) {
	      _statements2.default.find({}, '_id', function (err, statements) {
	        for (var i = users.length - 1; i >= 0; i--) {
	          var user = users[i]._id;
	          var rated = [];
	          for (var j = 300 - 1; j >= 0; j--) {
	            var ratedStatement = statements[getRandomInt(0, statements.length)]._id;
	            if (!rated.includes(ratedStatement)) {
	              var rateSide = getRandomInt(0, 3);
	              var update = {};

	              switch (rateSide) {
	                case 0:
	                  update = { $push: { WS: { user: user } } };
	                  break;
	                case 1:
	                  update = { $push: { NH: { user: user } } };
	                  break;
	                case 2:
	                  update = { $push: { RI: { user: user } } };
	                  break;
	              }
	              var updateConfig = { safe: true, upsert: true, new: true };
	              _ratings2.default.findOneAndUpdate({ statement: ratedStatement }, update, updateConfig, function (err, completed) {
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

	server.listen(8082, function () {
	  console.info('listening on port 8082');
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
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildTopicsSchema = new Schema({
	    content: String,
	    dates_discussed: [Date],
	    short_id: String
	});

	var Topic = mongoose.model('Topics', buildTopicsSchema);
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
	  expiration: Date,
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
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var first = ["Abraham", "Andrew", "Benjamin", "Calvin", "Chester", "Franklin", "George", "Grover", "Herbert", "James", "John", "Martin", "Millard", "Rutherford", "Theodore", "Thomas", "Ulysses", "Warren", "William", "Woodrow", "Zachary"];

	var middle = ["A.", "B.", "D.", "G.", "Henry", "Howard", "K.", "Quincy", "S.", "Van"];

	var last = ["Adams", "Arthur", "Buchanan", "Buren", "Cleveland", "Coolidge", "Fillmore", "Garfield", "Grant", "Harding", "Harrison", "Hayes", "Hoover", "Jackson", "Jefferson", "Johnson", "Lincoln", "Madison", "McKinley", "Monroe", "Pierce", "Polk", "Roosevelt", "Taft", "Taylor", "Tyler", "Washington", "Wilson"];

	var names = {
		first: first,
		middle: middle,
		last: last
	};

	exports.default = names;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var sIpsum = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which.";

	exports.default = sIpsum;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ }
/******/ ]);