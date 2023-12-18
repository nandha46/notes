import express from 'express';
const app = express();
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from 'config';
import winston from 'winston';
import 'winstom-mongodb';

winston.add(winston.transports.File, {
  filename: "logfile.log",
  handleExceptions: true,
  handleRejections: true,
});

const db_url = config.get('db_url');
const db_name = config.get('db_name');
winston.add(winston.transports.MongoDB, {db:`${db_url}${db_name}}`});

import compression from 'compression';
app.use(compression());

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(morgan('dev'));

/*

// Catch uncaught Exception outside of request processing pipelines
process.on('uncaughtException', ex => {
  console.log('Uncaught Exception', ex);
  winston.error(ex.message, ex);
});

// Catch unhandled Rejection inside of request processing pipelines
process.on('unhandledRejection', ex => {
  console.log('Unhandled Rejection', ex);
  winston.error(ex.message, ex);
});
 */

app.set('view engine', 'ejs');
app.set('views', './views');

import storePageview from './middleware/PageviewMiddleware.js';

app.use(storePageview);

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import routes from './startup/routes.js';
routes(app);
import db from './startup/db.js';
db();
const port = config.get('port');

app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});
