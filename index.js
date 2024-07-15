import express from 'express';
const app = express();
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';

import logger from './startup/logger.js';

import compression from 'compression';
app.use(compression());

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(morgan('dev'));

import config from 'config';

app.set('view engine', 'ejs');
app.set('views', './views');

import storePageview from './middleware/PageviewMiddleware.js';

app.use(storePageview);

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import routes from './startup/routes.js';
routes(app);
import db from './startup/db.js';
db(logger);
const port = config.get('port');

app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});


