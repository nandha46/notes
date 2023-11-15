import express from 'express';

const router = express.Router();

import Movie from '../models/movie.js';
import WatchlistExport from '../models/watchlist.js';

const {validateWatchlist, Watchlist} = WatchlistExport;

router.get('/films', async (req, res) => {
    const allFilms = await getAllMovies();
    res.status(200).render('movies/films', {allFilms: allFilms});
});

router.get('/to-download', async (req, res) => {
    const allWatchlists = await getAllWatchlist();
    res.status(200).render('movies/downloadList', {allWatchlists: allWatchlists});
});

async function getAllMovies () {
    const movies = await Movie.find();
    return movies;
}

async function getAllWatchlist () {
    const watchlist = await Watchlist.find({mediaType:1}).populate('movie');
    console.log(watchlist[0]);
    return watchlist;
}

export default router;