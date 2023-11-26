import express from 'express';
const router = express.Router();

import Person from '../models/person.js';

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

export default router;