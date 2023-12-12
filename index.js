import express from 'express';
const app = express();

import helmet from 'helmet';
import morgan from 'morgan';

import config from 'config';

import compression from 'compression';
app.use(compression());

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

import mongoose from 'mongoose';
mongoose
  .connect("mongodb://localhost/mongo-test")
  .then(() => {
    console.log("connected to monogo db on port 27017");
  })
  .catch((err) => {
    console.error("could not connect to mongo db....");
  });

import storePageview from './middleware/PageviewMiddleware.js';

app.use(storePageview);

import commonRoutes from './routes/commonRoutes.js'
import movies from './routes/movies.js';
import tvshows from './routes/tvshows.js';
import auth from './routes/auth.js';
import persons from './routes/persons.js';
import api from './routes/api.js';
import cookieParser from 'cookie-parser';
import certifications from './routes/certifications.js';

app.use(cookieParser());

app.use('/', commonRoutes);
app.use('/', movies);
app.use('/', tvshows);
app.use('/', auth);
app.use('/', persons);
app.use('/api', api);
app.use('', certifications);

const port = config.get('port');

app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});
