"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
require("./lib/agenda");
var _index = _interopRequireDefault(require("./routes/index"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _user = _interopRequireDefault(require("./routes/user"));
var _auth2 = require("./middlewares/auth");
var _app = _interopRequireDefault(require("./middlewares/app"));
var _sharedData = _interopRequireDefault(require("./middlewares/shared-data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// view engine setup
app.set('views', _path["default"].join(__dirname, '../views'));
app.set('view engine', 'ejs');

// setup app middleware
app.use(_app["default"]);

// setup shared data across pages
app.use(_sharedData["default"]);

// setup routes
app.use('/auth', _auth2.isAuth, _auth["default"]);
app.use('/', _auth2.isAuth, _index["default"]);
app.use('/user', _auth2.isAuth, _user["default"]);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var _default = exports["default"] = app;