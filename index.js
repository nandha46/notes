// const express = require('express');
import express from 'express';
const app = express();
// const Joi = require('joi');
import Joi from 'joi';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';

// const helmet  = require('helmet');
// const morgan = require('morgan');

import helmet from 'helmet';
import morgan from 'morgan';

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(morgan('tiny'));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

// const { Movie } = require('./models/movie');

// import Movie from '../models/movie.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzU2YTNmOTk4MWMzMjRmMDE3MDI5MTY4MmUwNzQ2ZSIsInN1YiI6IjYzMzBiMWRlYTVkODQ5MDA5MjU1OTY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyrNPvyjIohhS-gGcJxBJbfAar6xJNMljeJOkU35NkU'
  }
};

app.get('/', (req, res)=>{
    res.status(200).render('index', {});
});

app.post('/add-to-download-list', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.send(result.error);
        return;
    }
    res.status(200).send( {status: "success", movie: []});
});

app.listen(3000, () => {
    console.log('listening on port 3000....')
});

async function saveMovie (){
    const movie = new Movie({
        "adult": false,
        "backdrop_path": "/askg3SMvhqEl4OL52YuvdtY40Yb.jpg",
        "belongs_to_collection": null,
        "budget": 175000000,
        "genres": [
          {
            "id": 10751,
            "name": "Family"
          },
          {
            "id": 16,
            "name": "Animation"
          },
          {
            "id": 14,
            "name": "Fantasy"
          },
          {
            "id": 10402,
            "name": "Music"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 12,
            "name": "Adventure"
          }
        ],
        "homepage": "https://www.pixar.com/feature-films/coco",
        "id": 354912,
        "imdb_id": "tt2380307",
        "original_language": "en",
        "original_title": "Coco",
        "overview": "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        "popularity": 850.864,
        "poster_path": "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
        "production_companies": [
          {
            "id": 3,
            "logo_path": "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
            "name": "Pixar",
            "origin_country": "US"
          },
          {
            "id": 2,
            "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
            "name": "Walt Disney Pictures",
            "origin_country": "US"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "US",
            "name": "United States of America"
          }
        ],
        "release_date": "2017-10-27",
        "revenue": 800526015,
        "runtime": 105,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          },
          {
            "english_name": "Spanish",
            "iso_639_1": "es",
            "name": "Español"
          }
        ],
        "status": "Released",
        "tagline": "The celebration of a lifetime",
        "title": "Coco",
        "video": false,
        "vote_average": 8.217,
        "vote_count": 18075
      });

    const mov = await movie.save();
    console.log('Movie saved...')
  }

//   saveMovie();