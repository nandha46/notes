import express from 'express';

const router = express.Router();

import Tv from '../models/tv.js';
import WatchlistExport from '../models/watchlist.js';

const {validateWatchlist, Watchlist} = WatchlistExport;

router.get('/tvshows', async (req, res) => {
    const allShows = await getAllTvshows();
    res.status(200).render('tvshows/allTvshows', {allShows: allShows});
});

router.get('/tvshows-to-download', async (req, res) => {
    const allWatchlists = await getAllWatchlist();
    res.status(200).render('tvshows/downloadList', {allWatchlists: allWatchlists});
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