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

	var _users = __webpack_require__(5);

	var _users2 = _interopRequireDefault(_users);

	var _topics = __webpack_require__(6);

	var _topics2 = _interopRequireDefault(_topics);

	var _posts = __webpack_require__(7);

	var _posts2 = _interopRequireDefault(_posts);

	var _statements = __webpack_require__(8);

	var _statements2 = _interopRequireDefault(_statements);

	var _names3 = __webpack_require__(4);

	var _names4 = _interopRequireDefault(_names3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function connectToDb(mongoose) {
	  mongoose.connect('localhost:27017/nullspeakTEST', function (err) {
	    if (err) {
	      console.log('Err, could not connect to the database.');
	    } else {
	      var db = mongoose.connection;
	      console.log('connected to MONGO');
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

	  connectToDb(_mongoose2.default);

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

	  res.send('Building the NAMES dB...');
	});

	//-----------------------------------------------------------------------------------------------//
	//                                                                                               //
	//                                BUILD      USERS                                               //
	//                                                                                               //
	//-----------------------------------------------------------------------------------------------//


	server.get('/build/users', function (req, res) {

	  connectToDb(_mongoose2.default);

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

	  for (var i = 10 - 1; i >= 0; i--) {
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

	  res.send('Building the USERS dB...');
	});

	//-----------------------------------------------------------------------------------------------//
	//                                                                                               //
	//                                BUILD      TOPICS                                              //
	//                                                                                               //
	//-----------------------------------------------------------------------------------------------//

	server.get('/build/topics', function (req, res) {

	  res.send('Building the TOPICS dB...');
	});

	//-----------------------------------------------------------------------------------------------//
	//                                                                                               //
	//                                BUILD      POSTS                                               //
	//                                                                                               //
	//-----------------------------------------------------------------------------------------------//

	server.get('/build/posts', function (req, res) {

	  res.send('Building the POSTS dB...');
	});

	//-----------------------------------------------------------------------------------------------//
	//                                                                                               //
	//                                BUILD      STATEMENTS                                          //
	//                                                                                               //
	//-----------------------------------------------------------------------------------------------//

	server.get('/build/statements', function (req, res) {

	  res.send('Building the STATEMENTS dB...');
	});

	server.get('/api', function (req, res) {
	  var db = _mongoose2.default.connection;
	  res.send(JSON.stringify(db));
	});

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
/* 5 */
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
			}]
		}
	});

	var User = mongoose.model('User', buildUsersSchema);

	exports.default = User;

/***/ },
/* 6 */
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
/* 7 */
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
	  response_to: {
	    type: Schema.ObjectId,
	    ref: "posts"
	  },
	  response_in: Number,
	  expiration: Date,
	  statements: [{
	    type: Schema.ObjectId,
	    ref: "statements"
	  }]
	});

	var Post = mongoose.model('Posts', buildPostsSchema);
	exports.default = Post;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mongoose = __webpack_require__(2);
	var Schema = mongoose.Schema;

	var buildStatementsSchema = new Schema({
	  content: String,
	  has_edits: Boolean,
	  new_edited: {
	    type: Schema.ObjectId,
	    ref: "statements"
	  },
	  edit_origin: {
	    type: Schema.ObjectId,
	    ref: "statements"
	  },
	  ratings: {
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
	    // fallacies : [
	    //   {
	    //     type : Schema.ObjectId,
	    //     ref : "fallacies"
	    //   }
	    // ]
	  }
	});

	var Statement = mongoose.model('Statement', buildStatementsSchema);
	exports.default = Statement;

/***/ }
/******/ ]);