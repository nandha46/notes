import express from 'express';
const router = express.Router();

import Person from '../models/person.js';
import Tags from '../models/tags.js';
import Movie from '../models/movie.js';
import FavPerson from '../models/fav_person.js';

router.post('/v1/persons', async (req, res) => {

let searchValue = req.body.search.value;
let persons, totalPersons;
if(searchValue == ''){
  totalPersons = await Person.estimatedDocumentCount();
  persons = await Person.find().limit(req.body.length).skip(req.body.start);    
} else {
  let search = new RegExp(searchValue, 'i');
  totalPersons = await Person.find( {$or:[ {name: { $regex:search }}, {place_of_birth: {$regex:search}}, {biography: {$regex:search}} ] }).estimatedDocumentCount();
  persons = await Person.find({$or:[ {name: { $regex:search }}, {place_of_birth: {$regex:search}}, {biography: {$regex:search}} ] }).limit(req.body.length).skip(req.body.start);
}
    res.status(200).send({
      draw:req.body.draw,
      recordsTotal:totalPersons,
      recordsFiltered:totalPersons,
      data:persons
    });
});

router.post('/v1/movies', async (req, res) => {

let searchValue = req.body.search.value;
let movies, totalMovies;
if(searchValue == ''){
  totalMovies = await Movie.estimatedDocumentCount();
  movies = await Movie.find().limit(req.body.length).skip(req.body.start).populate('language');    
} else {
  let search = new RegExp(searchValue, 'i');
  totalMovies = await Movie.find( {$or:[ {title: { $regex:search }}, {original_title: {$regex:search}}, {original_language: {$regex:search}}, {overview: {$regex:search}} ] }).estimatedDocumentCount();
  movies = await Movie.find({$or:[ {title: { $regex:search }}, {original_title: {$regex:search}}, {original_language: {$regex:search}}, {overview: {$regex:search}} ] }).limit(req.body.length).skip(req.body.start).populate('language');
}
    res.status(200).send({
      draw:req.body.draw,
      recordsTotal:totalMovies,
      recordsFiltered:totalMovies,
      data:movies
    });
});

router.get('/v1/tags', (req,res) => {
  const query = req.query.option.term;
  const type = req.query.option._type;
  const searchKey = new RegExp(query,'i');
  Tags.find({name:{$regex:searchKey}},'_id name').then(result => {
    res.status(200).send(result);
  }).catch(err => {
    console.error(err);
    res.send('Error');
  });
});

router.get('/v1/person/fav/:id?', (req, res)=> {
  const fav_person = new FavPerson({person:req.params.id, isFavourite:true});
    fav_person.save().then(()=> {
      console.log('Favourite Person Saved')
      res.send({success:true})
    }).catch(err => {
      console.error(err)
      res.send({success:false})
    });
})

router.get('/v1/favperson/:id?', (req, res)=> {
    FavPerson.findById(req.params.id).populate('persons').then(result => res.send(result)).catch(err => res.send(err));
});

export default router;