import createError from 'http-errors';
import express from 'express';
import path from 'path';

import './config/agenda'
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import { isAuth } from './middlewares/auth';
import appMiddleware from './middlewares/app';
import sharedDataMiddleware from './middlewares/shared-data';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// setup app middleware
app.use(appMiddleware)

// setup shared data across pages
app.use(sharedDataMiddleware)

// setup routes
app.use('/auth', isAuth, authRouter)
app.use('/', indexRouter);
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
