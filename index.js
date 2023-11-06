const express = require('express');
const app = express();

const helmet  = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');

app.use(helmet());
app.use(morgan('tiny'));

app.set('view engine', 'pug');
app.set('views', './views');

const movieSchema = {
    tmdb_id: Joi.number().required()
};

app.get('/', (req, res)=>{
    res.status(200).send('<h1> Hello world <h1>');
});

app.listen(3000, () => {
    console.log('listening on port 3000....')
});