const express = require("express");

const app = express();

const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", usersControllers.getAllUsers);
app.get("/api/users/:id", usersControllers.getOneUser);

module.exports = app;
