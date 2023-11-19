"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _connectMongodbSession = _interopRequireDefault(require("connect-mongodb-session"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var _index = _interopRequireDefault(require("./routes/index"));
var _auth = _interopRequireDefault(require("./routes/auth"));
var _user = _interopRequireDefault(require("./routes/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var sessionStore = new _connectMongodbSession["default"](_expressSession["default"])({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

// view engine setup
app.set('views', _path["default"].join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use((0, _connectFlash["default"])());
app.use(function (req, res, next) {
  // setup shared data across pages
  var errors = req.flash('errors');
  var formData = req.flash('formData');
  var errorObject = {};
  errors.forEach(function (item) {
    errorObject[item.path] = item.msg;
  });
  res.locals.errors = errorObject;
  res.locals.formData = formData ? formData[0] : null;
  next();
});
app.use('/', _index["default"]);
app.use('/auth', _auth["default"]);
app.use('/user', _user["default"]);

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