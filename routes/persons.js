import express from "express";
const router = express.Router();

import path from 'path';
import axios from "axios";

import fileExists from "../services/file_service.js";
import delay from "../services/delay_service.js";
import {promises as fsPromises} from 'fs';
import authMiddleware from '../middleware/auth.js';
import Person from "../models/person.js";

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

router.get('/download-persons-posters', async(req, res) => {
    let persons = await Person.find({$and:[{profile_path:{$ne:null}},{profile_path:{$exists:true}},{poster_downloaded:{$exists:false}}]}).select('profile_path');
    const imageUrl = 'https://image.tmdb.org/t/p/original';
    const imageDirectory = 'public/tmdb/person_posters';
    const dirname = path.resolve();
    let downloaded = 0;
    let alreadyExists = 0;
    for (let mov of persons){
      console.log("loop iterating...");
      await delay(500);
      try {
        // Download the image using axios
        const imagePath = path.join(dirname, imageDirectory, mov.profile_path);

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

        let url = imageUrl+mov.profile_path;
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
        console.log('Error Message:', error.message);
        res.status(500).send('Internal Server Error');
      }

      console.error(error.response);
      console.log("Skipping axios file not found error..")
    }
    }

    let respData = {
        status:true,
        downloaded: downloaded    
    }

    res.status(200).send(respData);
});

export default router;