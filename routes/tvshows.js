import express from 'express';

const router = express.Router();

import Tv from '../models/tv.js';
import WatchlistExport from '../models/watchlist.js';
const {validateWatchlist, Watchlist} = WatchlistExport;

import authMiddleware from '../middleware/auth.js';

router.get('/all-tvshows', authMiddleware, async (req, res) => {
    const allShows = await getAllTvshows();
    res.status(200).render('tvshows/tvshows', {title: "All TV Shows", allShows: allShows});
});

router.get('/tvshows-gallery', authMiddleware, async (req, res) => {
    const allShows = await getAllTvshows();
    res.status(200).render('tvshows/tvshowGallery', {title: "TV Shows Gallery", allShows: allShows});
});

router.get('/tvshows-to-download', authMiddleware, async (req, res) => {
    const allWatchlists = await getAllWatchlist();
    res.status(200).render('tvshows/toDownloadTv', {title: "TV Shows Download list", allWatchlists: allWatchlists});
});

async function getAllTvshows () {
    const tvshows = await Tv.find();
    return tvshows;
}

async function getAllWatchlist () {
    const watchlist = await Watchlist.find({mediaType:2}).populate('tvshow');
    console.log(watchlist[0]);
    return watchlist;
}

export default router;