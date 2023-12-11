import express from "express";
const router = express.Router();

import fetch from "node-fetch";
import config from "config";

import Person from "../models/person.js";
import Movie from "../models/movie.js";
import authMiddleware from '../middleware/auth.js';

router.get('/persons', authMiddleware, async(req, res)=> {
    res.status(200).render('persons/allPersons', {title: "All Persons"});
});

router.get('/persons-fav', authMiddleware, async(req, res)=> {
    res.status(200).render('persons/favPersons', {title: "Favorite Persons", serverside_class:"datatable-init-export-serverside-fav-persons"});
});

router.get('/persons-known', authMiddleware, async(req, res)=> {
    res.status(200).render('persons/favPersons', {title: "Known Persons", serverside_class:"datatable-init-export-serverside-known-persons"});
});

router.get('/persons-gallery', authMiddleware, async(req, res) => {
    res.status(200).render('persons/personGallery');
});

let personCounter;
let personDuplicateCounter;

router.get('/load-persons-from-cast', async (req, res)=> {

    personCounter = 0;
    personDuplicateCounter = 0;

    const bearer_token = config.get('tmdb_bearer_token');
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${bearer_token}`
        }
      };
    let movies = await Movie.find().sort({createdAt:-1}).limit(100);
    for (let movie of movies){
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`;
        setTimeout(()=> {
            fetch(url, options)
            .then(response => {
             let data = response.json();
             data.then(data => {
                  movie.credits = {cast: data.cast };
                  movie
                    .save()
                    .then(() => {
                      console.log("movie updated..");
                      movieCounter++;
                    })
                    .catch(err => {
                        console.error(err)
                    })
                  for (let castMember of movie.credits.cast ){
                        loadPersonDetails(castMember.id, options);
                  }

             });
          }).catch(err => console.error('error:' + err));
        } ,100);
    }

    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Update Values Example</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 50px;
            }
        </style>
    </head>
    <body>
    
        <h1>Updated Values</h1>
        <div id="personsValue">Persons updated: ${personCounter}</div>
        <div id="moviesValue">Persons Duplicates: ${personDuplicateCounter}</div>
    </body>
    </html>`);
});

function loadPersonDetails (personId, options) {
    const url = `https://api.themoviedb.org/3/person/${personId}?append_to_response=external_ids%2Cmovie_credits%2Ctv_credits&language=en-US`;
    setTimeout(()=> {
        fetch(url, options)
        .then(response => {
         let data = response.json();
         data.then(data => {
            const person = new Person(data);
            person
              .save()
              .then(() => {
                console.log("person saved..");
                personCounter++;
              })
              .catch( err => {
                if(err.code === 11000){
                console.error('Duplicate Person');
                personDuplicateCounter++;
              } else {
                console.error(err)
              }});
         });
      }).catch(err => console.error('error:' + err));
    } ,100);
}

export default router;