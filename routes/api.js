import express from "express";
const router = express.Router();

import Person from "../models/person.js";
import Tags from "../models/tags.js";
import Movie from "../models/movie.js";
import FavPerson from "../models/fav_person.js";

router.post("/v1/persons", async (req, res) => {
  const sortQuery = generateSortQuery(req);

  let searchValue = req.body.search.value;
  let persons, filteredPersons;
  let totalPersons = await Person.estimatedDocumentCount();
  if (searchValue == "") {
    persons = await Person.find()
      .sort(sortQuery)
      .limit(req.body.length)
      .skip(req.body.start);
    filteredPersons = totalPersons;
  } else {
    let search = new RegExp(searchValue, "i");
    filteredPersons = await Person.countDocuments({
      $or: [
        { name: { $regex: search } },
        { place_of_birth: { $regex: search } },
        { biography: { $regex: search } },
      ],
    });
    persons = await Person.find({
      $or: [
        { name: { $regex: search } },
        { place_of_birth: { $regex: search } },
        { biography: { $regex: search } },
      ],
    })
      .sort(sortQuery)
      .limit(req.body.length)
      .skip(req.body.start);
  }
  res.status(200).send({
    draw: req.body.draw,
    recordsTotal: totalPersons,
    recordsFiltered: filteredPersons,
    data: persons,
  });
});

router.post("/v1/fav/persons", async (req, res) => {
  let searchValue = req.body.search.value;

  const sortQuery = generateSortQuery(req);

  let persons, filteredPersons;
  let totalPersons = await FavPerson.countDocuments({
    isFavourite: true,
  });
  if (searchValue == "") {
    persons = await FavPerson.find({ isFavourite: true })
      .sort(sortQuery)
      .populate("person known_movie tags")
      .limit(req.body.length)
      .skip(req.body.start);
    filteredPersons = totalPersons;
  } else {
    let search = new RegExp(searchValue, "i");
    console.log(search);
    filteredPersons = await FavPerson.countDocuments({
      $and: [
        { isFavourite: true },
        {
          $or: [
            { name: { $regex: search } },
            { place_of_birth: { $regex: search } },
            { biography: { $regex: search } },
          ],
        },
      ]
    });
    persons = await FavPerson.find(
      {
        $and: [
          { isFavourite: true },
          {
            $or: [
              { name: { $regex: search } },
              { place_of_birth: { $regex: search } },
              { biography: { $regex: search } },
            ],
          },
        ]
      }
    )
      .populate("person known_movie")
      .sort(sortQuery)
      .limit(req.body.length)
      .skip(req.body.start);
  }
  res.status(200).send({
    draw: req.body.draw,
    recordsTotal: totalPersons,
    recordsFiltered: filteredPersons,
    data: persons,
  });
});

router.post("/v1/known/persons", async (req, res) => {
  let searchValue = req.body.search.value;
  let persons, totalPersons;
  if (searchValue == "") {
    totalPersons = await FavPerson.countDocuments({
      isKnown: true,
    });
    persons = await FavPerson.find({ isKnown: true })
      .populate("person known_movie tags")
      .limit(req.body.length)
      .skip(req.body.start);
  } else {
    let search = new RegExp(searchValue, "i");
    totalPersons = await FavPerson.countDocuments({
      $and: [
        { isKnown: true },
        {
          $or: [
            { name: { $regex: search } },
            { place_of_birth: { $regex: search } },
            { biography: { $regex: search } },
          ],
        },
      ]
    });
    persons = await FavPerson.find(
      {
        $and: [
          { isKnown: true },
          {
            $or: [
              { name: { $regex: search } },
              { place_of_birth: { $regex: search } },
              { biography: { $regex: search } },
            ],
          },
        ]
      }
    )
      .populate("person known_movie")
      .limit(req.body.length)
      .skip(req.body.start);
  }
  res.status(200).send({
    draw: req.body.draw,
    recordsTotal: totalPersons,
    recordsFiltered: totalPersons,
    data: persons,
  });
});

router.post("/v1/movies", async (req, res) => {
  let searchValue = req.body.search.value;
  let movies, totalMovies, moviesFiltered;
  totalMovies = await Movie.estimatedDocumentCount();

  if (searchValue == "") {
    movies = await Movie.find()
      .limit(req.body.length)
      .skip(req.body.start)
      .populate("language");
      moviesFiltered = totalMovies;
  } else {
    let search = new RegExp(searchValue, "i");
    moviesFiltered = await Movie.countDocuments({
      $or: [
        { title: { $regex: search } },
        { original_title: { $regex: search } },
        { original_language: { $regex: search } },
        { overview: { $regex: search } },
      ],
    });
    movies = await Movie.find({
      $or: [
        { title: { $regex: search } },
        { original_title: { $regex: search } },
        { original_language: { $regex: search } },
        { overview: { $regex: search } },
      ],
    })
      .limit(req.body.length)
      .skip(req.body.start)
      .populate("language");
  }

  const resObj = {
    draw: req.body.draw,
    recordsTotal: moviesFiltered,
    recordsFiltered: moviesFiltered,
    data: movies,
  };

  res.status(200).send(resObj);
});

router.get("/v1/tags", (req, res) => {
  const query = req.query.option.term;
  const type = req.query.option._type;
  const searchKey = new RegExp(query, "i");
  Tags.find({ name: { $regex: searchKey } }, "_id name")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error");
    });
});

router.get("/v1/person/fav/:id?", (req, res) => {
  const fav_person = new FavPerson({
    person: req.params.id,
    isFavourite: true,
  });
  fav_person
    .save()
    .then(() => {
      console.log("Favourite Person Saved");
      res.send({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ success: false });
    });
});

router.get("/v1/person/known/:id?", (req, res) => {
  const fav_person = new FavPerson({ person: req.params.id, isKnown: true });
  fav_person
    .save()
    .then(() => {
      console.log("Favourite Person Saved");
      res.send({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send({ success: false });
    });
});

router.get("/v1/favperson/:id?", (req, res) => {
  FavPerson.findById(req.params.id)
    .populate("person known_movie")
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

function generateSortQuery(req) {
  // cols Array
  let cols = req.body.columns;
  let orderCol = req.body.order[0].column;
  let orderDirection = req.body.order[0].dir;
  let sortQuery = [[cols[orderCol].data, orderDirection]];
  return sortQuery;
}

export default router;
