import express from "express";
const router = express.Router();

import Movie from '../models/movie.js';
import Pageview from "../models/pageview.js";

import axios from 'axios';
import { promises as fsPromises } from 'fs';
import path from 'path';
import fileExists from "../services/file_service.js";

import Tv from '../models/tv.js';
import watchlistExport from '../models/watchlist.js';

const {validateWatchlist ,Watchlist} = watchlistExport;

import authMiddleware from '../middleware/auth.js';

router.get('/', authMiddleware, (req, res)=>{
  Pageview.aggregate([
      {$group:{
        _id:'$page',
        count:{$sum:1}
      }},
      {
        $sort: {
          count: -1, // Sort in descending order based on the count
        },
      },
      {
        $limit: 9, // Limit the results to 9 documents
      }
    ]).then(result => {
      res
      .status(200)
      .render("index", {
        title: "Dashboard | Notes App",
        pageviewsByUser: result,
      }); 
    })
    .catch(err => {
      res
      .status(200)
      .render("index", {
        title: "Dashboard | Notes App",
        pageviewsByUser: false,
      });
    });
});

router.get('/download-posters', authMiddleware, async (req, res) => {
    let movies = await Movie.find({$and:[{poster_path:{$ne:null}},{poster_path:{$exists:true}},{poster_downloaded:{$exists:false}}]}).select('poster_path');
    const imageUrl = 'https://image.tmdb.org/t/p/original';
    const imageDirectory = 'public/tmdb/movie_posters';
    const dirname = path.resolve();
    let downloaded = 0;
    let alreadyExists = 0;
    for (let mov of movies){
      console.log("loop iterating..."+mov);
      try {
        // Download the image using axios
        const imagePath = path.join(dirname, imageDirectory, mov.poster_path);

        const exists = await fileExists(imagePath);

        if(exists) {
          console.log('poster exists..');
          mov.poster_downloaded = true;
          mov.save().then(() => {
            console.log('poster status updated..');
          }).catch( err => {
            console.error("Error updating poster doesn't exist..")
          });
          alreadyExists++;
          continue;
        }

        let url = imageUrl+mov.poster_path;
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Save the image to the disk
        await fsPromises.writeFile(imagePath, response.data);
        console.log('Poster Saved.');
        downloaded++;
        mov.poster_downloaded = true;
        mov.save().then(() => {
          console.log('poster status updated..');
        }).catch( err => {
          console.error("Error updating poster exist status..")
        });
    } catch (error) {
      if(error.response && error.response.status != 404){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(500).send('Internal Server Error');
      } else if (error.request){
        console.log(error.request);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Error Message', error.message);
        res.status(500).send('Internal Server Error');
      }

      console.error(error.response);
      console.log("Skipping axios file not found error..")
    }
    }

    res.status(200).send(`
    Downloaded: ${downloaded} 
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
      comment:req.body.comment,
      tags:req.body.tags
    });

    newWatchlistEntry.save().then(()=> {
      console.log('Entry saved')
    }).catch((err)=> {
      console.error(err);
    })

    res.status(200).send( {status: true, "data": req.body});
});

export default router;