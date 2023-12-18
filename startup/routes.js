import express from "express";

import commonRoutes from "./routes/commonRoutes.js";
import movies from "./routes/movies.js";
import tvshows from "./routes/tvshows.js";
import auth from "./routes/auth.js";
import persons from "./routes/persons.js";
import api from "./routes/api.js";
import actions from "./routes/actions.js";

import error from "./middleware/error.js";

export default function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use("/", commonRoutes);
  app.use("/", movies);
  app.use("/", tvshows);
  app.use("/", auth);
  app.use("/", persons);
  app.use("/api", api);
  app.use("/actions", actions);

  app.use(error);
}
