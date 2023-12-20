const express = require("express");

const app = express();
// Middleware permet de lire du JSON.
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers");
const movieValidate = require("./middlewares/validateMovies");
const usersValidate = require("./middlewares/validateUsers");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", usersControllers.getAllUsers);
app.get("/api/users/:id", usersControllers.getOneUser);

app.post("/api/movies", movieValidate, movieControllers.postMovie);
app.post("/api/users", usersValidate, usersControllers.postNewUser);

app.put("/api/movies/:id", movieValidate, movieControllers.updateMovie);
app.put("/api/users/:id", usersControllers.updateOneUser);

app.delete("/api/movies/:id", movieControllers.delMovie);
app.delete("/api/users/:id", usersControllers.delUser);

module.exports = app;
