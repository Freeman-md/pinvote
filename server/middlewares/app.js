import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import flash from 'connect-flash';
import csrfProtection from './csrf';
import appConfig from '../config/app';

const app = express();

const sessionStore = new MongoDBStore(session)({
  uri: appConfig.env.mongoDbUri,
  collection: 'sessions'
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(session({
  secret: appConfig.env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));
app.use(flash());
app.use(csrfProtection);

export default app;
