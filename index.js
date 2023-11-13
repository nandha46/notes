import express from 'express';
const app = express();
import Joi from 'joi';

import helmet from 'helmet';
import morgan from 'morgan';

import countryList from 'country-list';

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('tiny'));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/mongo-test')
            .then(()=> {
                console.log('connected to monogo db');
            }).catch(err => {
                console.error('could not connect to mongo db....');
            });

import Movie from './models/movie.js';
import Tv from './models/tv.js';
import Watchlist from './models/watchlist.js';

app.get('/', (req, res)=>{
    res.status(200).render('index', {});
});

import movies from './routes/movies.js';

app.use('/', movies);


app.post('/add-to-download-list', (req, res) => {
    const schema = Joi.object({
        mediaType: Joi.number().required(),
        selectedTitle: Joi.number().required(),
        adult:Joi.boolean(),
        priority:Joi.number(),
        url:Joi.string().allow(''),
        comment: Joi.string().allow(''),
        movArr: Joi.array().required(),
        tvArr: Joi.array().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(200).send({status:false, "message": result.error.details[0].message});
        return;
    }

    if(req.body.movArr){
      for(const mov of req.body.movArr){
        let movie = new Movie(mov);
        movie.save().then(()=> {console.log("Movie saved")}).catch((err)=>{
          if(err.code === 11000){
            console.error('Duplicate Movie');
          } else {
            console.error('some other error in saving movie')
          }
        });
      }
    }
    
    // if(req.body.tvArr){
    //   for(const tv of req.body.tvArr){
    //     let movie = new Movie(tv);
    //     movie.save().then(()=> {console.log("Movie saved")}).catch((err)=>{
    //       if(err.code === 11000){
    //         console.error('Duplicate Movie');
    //       } else {
    //         console.error('some other error in saving movie')
    //       }
    //     });
    //   }
    // }

    let newWatchlistEntry = new Watchlist({
      mediaType:req.body.mediaType,
      id:req.body.selectedTitle,
      adult:req.body.adult,
      priority:req.body.priority,
      url:req.body.url,
      comment:req.body.comment
    });

    newWatchlistEntry.save().then(()=> {
      console.log('Entry saved')
    }).catch((err)=> {
      console.error(err);
    })

    res.status(200).send( {status: true, "data": req.body});
});

app.listen(3000, () => {
    console.log('listening on port 3000....')
});
