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
mongoose.connect('mongodb://localhost/mongo-test')
            .then(()=> {
                console.log('connected to monogo db');
            }).catch(err => {
                console.error('could not connect to mongo db....');
            });

import commonRoutes from './routes/commonRoutes.js'
import movies from './routes/movies.js';
import tvshows from './routes/tvshows.js';
import auth from './routes/auth.js';
import persons from './routes/persons.js';
import api from './routes/api.js';
import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use('/', commonRoutes);
app.use('/', movies);
app.use('/', tvshows);
app.use('/', auth);
app.use('/', persons);
app.use('/api', api);

let port = config.get('port');

// import certifications from './routes/certifications.js';

// app.use('', certifications);

app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});
