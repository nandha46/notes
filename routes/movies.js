import express from 'express';

const router = express.Router();

import Movie from '../models/movie.js';

router.get('/films', async (req, res) => {
    const allFilms = await getAllMovies();
    res.status(200).render('films', {allFilms: allFilms});
});

async function getAllMovies () {
    const movies = await Movie.find();
    return movies;
  }

export default router;