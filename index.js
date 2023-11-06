const express = require('express');
const app = express();

const helmet  = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('tiny'));

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

const movieSchema = {
    tmdb_id: Joi.number().required()
};

app.get('/', (req, res)=>{
    res.status(200).render('index', {});
});

app.listen(3000, () => {
    console.log('listening on port 3000....')
});