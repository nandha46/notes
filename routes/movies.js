import express from 'express';

const router = express.Router();

import Movie from '../models/movie.js';
import Watchlist from '../models/watchlist.js';

router.get('/films', async (req, res) => {
    const allFilms = await getAllMovies();
    res.status(200).render('films', {allFilms: allFilms});
});

router.get('/watchlist', async (req, res) => {
    const allFilms = await getAllWatchlist();
    res.status(200).render('downloadList', {allFilms: allFilms});
});

async function getAllMovies () {
    const movies = await Movie.find();
    return movies;
}

async function getAllWatchlist () {
    const watchlist = await Watchlist.find().populate('movie');
    console.log(watchlist);
    return watchlist;
}

export default router;