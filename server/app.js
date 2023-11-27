import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv'
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import flash from 'connect-flash'
import csrf from 'csurf'

import './lib/agenda'
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import { isAuth } from './middlewares/auth';
import { processValidationErrors } from './utils/helpers';

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express();

const sessionStore = new MongoDBStore(session)({
  uri: process.env.MONGO_DB_URI,
  collection: 'sessions'
})

const csrfProtection = csrf()

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// app.use('/dash', Agendash(agenda))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}))
app.use(flash())
app.use(csrfProtection)

// setup shared data across pages
app.use((req, res, next) => {
  const errors = req.flash('errors')
  const info = req.flash('info')
  const formData = req.flash('formData')

  res.locals.errors = processValidationErrors(errors)
  res.locals.info = info.length > 0 ? info[0] : null
  res.locals.formData = formData ? formData[0] : null
  res.locals.authenticated = req.session.authenticated
  res.locals.user = req.session.user
  res.locals.app = {
    url: process.env.APP_URL
  }
  res.locals.csrfToken = req.csrfToken()

  next()
})

app.get('/csrf-token', (req, res, next) => {
  res.json({
    csrfToken: req.csrfToken()
  })
})

app.use('/auth', isAuth, authRouter)
app.use('/', isAuth, indexRouter);
app.use('/user', isAuth, userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
