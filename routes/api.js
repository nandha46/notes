import express from 'express';
const router = express.Router();

import Person from '../models/person.js';

router.post('/v1/persons', async (req, res) => {

    /*  {
  draw: '1',
  order: [ { column: '0', dir: 'asc' } ],
  start: '0',
  length: '10',
  search: { value: '', regex: 'false' }
} 
*/

let searchValue = req.body.search.value;

const persons = searchValue == ''? await Person.find().limit(req.body.length) : await Person.find({name:req.body.search.value}).limit(req.body.length);

console.log(persons);

    res.status(200).send({
        "draw": 1,
        "recordsTotal": 2,
        "recordsFiltered": 2,
        "data": [
          [
            "A. K. Veerasamy",
            "Male",
            "Tamilnadu, India",
            "2.607",
            "Acting",
            "jan 1, 1927",
            "17",
            "0",
            ""
          ],
          [
            "Abbas",
            "Male",
            "Tamilnadu",
            "1.05",
            "Acting",
            "9th Oct 79",
            "15",
            "1",
            ""
          ]
        ]
      })
});

export default router;