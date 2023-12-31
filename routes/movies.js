import express from 'express';

const router = express.Router();

import Movie from '../models/movie.js';
import WatchlistExport from '../models/watchlist.js';
const {validateWatchlist, Watchlist} = WatchlistExport;

import authMiddleware from '../middleware/auth.js';

router.get('/all-films', authMiddleware, async (req, res) => {
    const allFilms = await getAllMovies();
    res.status(200).render('movies/films', { title:"All Movies", allFilms: allFilms});
});

router.get('/films-gallery', authMiddleware, async (req, res) => {
    const allFilms = await getAllMovies();
    res.status(200).render('movies/movieGallery', { title:"Movie Gallery", allFilms: allFilms});
});

router.get('/to-download-movies', authMiddleware, async (req, res) => {
    const allWatchlists = await getAllWatchlist();
    res.status(200).render('movies/toDownloadMovie', { title:"Movies To Download", allWatchlists: allWatchlists});
});

async function getAllMovies () {
    const movies = await Movie.find().limit(30);
    return movies;
}

async function getAllWatchlist () {
    const watchlist = await Watchlist.find({mediaType:1}).populate('movie');
    return watchlist;
}

export default router;