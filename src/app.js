const express = require("express");

const app = express();
// Middleware permet de lire du JSON.
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", usersControllers.getAllUsers);
app.get("/api/users/:id", usersControllers.getOneUser);

app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", usersControllers.postNewUser);

module.exports = app;
