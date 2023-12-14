import express from 'express';
const router = express.Router();

import fetch from "node-fetch";
import config from "config";
import authMiddleware from '../middleware/auth.js';

import Tags from '../models/tags.js';
import Person from "../models/person.js";
import Movie from "../models/movie.js";
import MovieCertification from '../models/movie_certification.js';
import TvCertification from '../models/tv_certification.js';

import { promises as fsPromises } from 'fs';
import path from 'path';

router.get('/', authMiddleware, async (req, res)=> {
   let totalPersons = await Person.countDocuments();
   let malePersons = await Person.countDocuments({gender:2});
   let femalePersons = await Person.countDocuments({gender:1});
   let nonBPersons = await Person.countDocuments({gender:0});
    res
      .status(200)
      .render("dashboard/actions", {
        title: "Server Actions",
        totalPersons: totalPersons,
        malePersons: malePersons,
        femalePersons: femalePersons,
        nonBPersons: nonBPersons,
      });
});

let updatedPersons = 0; 
let duplicatePersons = 0;
let updatedMovies = 0;

router.get('/load-persons-from-cast', async (req, res) => {
    updatedPersons = 0; 
    duplicatePersons = 0;
    updatedMovies = 0;

    const bearer_token = config.get('tmdb_bearer_token');
      const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${bearer_token}`
          }
        };
      let movies = await Movie.find().limit(20);

      for (let movie of movies){
          const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`;
        // Wait for 0.1 Seconds
          await delay(100);
         await getAndUpdateMovies(url, options, movie);
      }
  
      res.status(200).send({updatedMovies:updatedMovies, updatedPersons:updatedPersons, duplicatePersons:duplicatePersons});
  });

async function getAndUpdateMovies(url, options, movie) {
    try {
    fetch(url, options)
    .then((response) => {
      let data = response.json();
      data.then( async data => {
        movie.credits = { cast: data.cast };
        movie
          .save()
          .then(() => {
            console.log("movie updated..", updatedMovies++);
            console.log(data.cast);
          })
          .catch((err) => {
            console.error(err);
          });
        for (let castMember of movie.credits.cast) {
            // Wait for 0.1 Seconds
            await delay(100);
          loadPersonDetails(castMember.id, options);
        }
      });
    })
    .catch((err) => console.error("error:" + err));
} catch (err){
    console.error('App stopper', err);
}

  }
  
  function loadPersonDetails (personId, options) {
      const url = `https://api.themoviedb.org/3/person/${personId}?append_to_response=external_ids%2Cmovie_credits%2Ctv_credits&language=en-US`;
          
      fetch(url, options)
          .then(response => {
           let data = response.json();
           data.then(data => {
              const person = new Person(data);
              person
                .save()
                .then(() => {
                  console.log("person saved..", updatedPersons++);
                })
                .catch( err => {
                  if(err.code === 11000){
                  console.error('Duplicate Person', duplicatePersons++);
                } else {
                  console.error(err)
                }});
           });
        }).catch(err => console.error('error:' + err));
  }

function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
 }

 router.get('/load-certrifications', authMiddleware, async (req, res) => {
    const movCertFile = path.resolve('data/movie_cert.json');
    fileExists(movCertFile).then(()=> {
        fsPromises.readFile(movCertFile).then(fileDataBuffer => {
          const movieCertData = JSON.parse(fileDataBuffer.toString());
          for (let cert in movieCertData){
            let certArr = movieCertData[cert];
            for (let certData of certArr){
                let movC = new MovieCertification({
                    country:cert,
                    certification:certData.certification,
                    meaning:certData.meaning,
                    order:certData.order
                });
                movC.save().then(() => {console.log('Mov Cert Saved.')}).catch(err => {console.error(err)});
            }
          }
        })
      }).catch(err => {
        console.error(err);
        res.send(err);
      })
      
    const tvCertFile = path.resolve('data/tv_cert.json');
    fileExists(tvCertFile).then(()=> {
        fsPromises.readFile(tvCertFile).then(fileDataBuffer => {
        const tvCertData = JSON.parse(fileDataBuffer.toString());
        for (let cert in tvCertData){
            let certArr = tvCertData[cert];
            for (let certData of certArr){
                let tvC = new TvCertification({
                    country:cert,
                    certification:certData.certification,
                    meaning:certData.meaning,
                    order:certData.order
                });
                tvC.save().then(() => {console.log('TV Cert Saved.')}).catch(err => {console.error(err)});
            }
          }
        })
    }).catch(err => {
        console.error(err);
        res.send(err);
    })

    res.send('Completed');
});

router.get('/load-tags', authMiddleware, async (req, res)=> {
    const tagsFile = path.resolve('data/tags.json');
    fileExists(tagsFile).then(()=> {
      fsPromises.readFile(tagsFile).then(fileDataBuffer => {
        const tagsdata = JSON.parse(fileDataBuffer.toString());
        const tags = tagsdata.tags;
        const arr = [];
        for (let tag of tags){
          arr.push({name:tag});
        }
        Tags.insertMany(arr).then(()=> res.send('Inserted')).catch(err => {
          if(err.code === 11000){
            // Don't report duplicate
          } else {
            console.error('some other error in saving tags');
            res.send(err)
          }
        });
      })
    }).catch(err => {
      console.error(err);
      res.send(err);
    })
    res.send('Completed.')
});

async function fileExists(filePath) {
    try {
        await fsPromises.access(filePath, fsPromises.constants.F_OK);
        return true; // File exists
    } catch (err) {
        return false; // File does not exist
    }
  }

export default router;