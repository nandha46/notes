import express from "express";
const router = express.Router();

import authMiddleware from '../middleware/auth.js';

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

export default router;