import express from "express";
const router = express.Router();

import fetch from "node-fetch";
import config from "config";

import Person from "../models/person.js";
import Movie from "../models/movie.js";
import auth from '../middleware/auth.js'

router.get('/persons', auth, async(req, res)=> {
    res.status(200).render('persons/allPersons', {title: "All Persons"});
});

router.get('/persons-gallery', async(req, res) => {
    res.status(200).render('persons/personGallery');
});

router.get('/load-persons-from-cast', async (req, res)=> {
    const bearer_token = config.get('tmdb_bearer_token');
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${bearer_token}`
        }
      };
    let movies = await Movie.find();
    for (let movie of movies){
        console.log('waiting...');
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`;
        setTimeout(()=> {
            fetch(url, options)
            .then(response => {
             let data = response.json();
             data.then(data => {
                  movie.credits = {cast: data.cast };
                  movie.save().then(() => {
                      console.log("movie updated..");
                    })
                    .catch((err) => console.error(err));
                  for (let castMember of movie.credits.cast ){
                        loadPersonDetails(castMember.id, options);
                  }

             });
          }).catch(err => console.error('error:' + err));
        } ,100);
        console.log('done.');  
    }

    res.status(200).send('Done');
});

function loadPersonDetails (personId, options) {
    const url = `https://api.themoviedb.org/3/person/${personId}?append_to_response=external_ids%2Cmovie_credits%2Ctv_credits&language=en-US`;
    setTimeout(()=> {
        fetch(url, options)
        .then(response => {
         let data = response.json();
         data.then(data => {
            const person = new Person(data);
            person.save().then(()=>{console.log('person saved..')}).catch(err => console.error(err));
         });
      }).catch(err => console.error('error:' + err));
    } ,100);
}

export default router;