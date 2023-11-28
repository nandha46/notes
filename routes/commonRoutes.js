import express from "express";
const router = express.Router();

import Movie from '../models/movie.js';

import axios from 'axios';
import { promises as fsPromises } from 'fs';
import path from 'path';

import Tv from '../models/tv.js';
import watchlistExport from '../models/watchlist.js';

const {validateWatchlist ,Watchlist} = watchlistExport;

import authMiddleware from '../middleware/auth.js';

router.get('/', authMiddleware, (req, res)=>{
    res.status(200).render('index', {title: "Dashboard | Notes App"});
});

router.get('/download-posters', authMiddleware, async (req, res) => {
    let movies = await Movie.find().select('poster_path');
    const imageUrl = 'https://image.tmdb.org/t/p/original';
    const imageDirectory = 'public/tmdb/movie_posters';
    const dirname = path.resolve();
    let downloaded = 0;
    let alreadyExists = 0;
    let skipped = 0;
    for (let mov of movies){
      try {
        // Download the image using axios
        if (mov.poster_path == null) {
          console.log('Poster doesn\'t exist. Skipping...');
          skipped++;
          continue;
        }
        const imagePath = path.join(dirname, imageDirectory, mov.poster_path);

        const exists = await fileExists(imagePath);

        if(exists) {
          console.log('poster exists..');
          alreadyExists++;
          continue;
        }

        let url = imageUrl+mov.poster_path;
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Save the image to the disk
        await fsPromises.writeFile(imagePath, response.data);
        downloaded++;
        console.log('Poster Saved.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    }

    res.status(200).send(`
    Downloaded: ${downloaded} 
    Skipped: ${skipped}
    Exists: ${alreadyExists}
    `);
});

router.post('/add-to-download-list', (req, res) => {
    const result = validateWatchlist(req.body);
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
    
    if(req.body.tvArr){
      for(const tv of req.body.tvArr){
        let newTv = new Tv(tv);
        newTv.save().then(()=> {console.log("TV Show saved")}).catch((err)=>{
          if(err.code === 11000){
            console.error('Duplicate TV Show');
          } else {
            console.error('some other error in saving tv show')
          }
        });
      }
    }

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

async function fileExists(filePath) {
    try {
        await fsPromises.access(filePath, fsPromises.constants.F_OK);
        return true; // File exists
    } catch (err) {
        return false; // File does not exist
    }
  }

export default router;