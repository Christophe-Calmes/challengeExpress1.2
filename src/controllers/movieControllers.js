const database = require("../../database");


const getMovies = (req, res) => {
  database
  .query("SELECT * FROM `movies`")
  .then(([movies]) => {
    res.json(movies); // use res.json instead of console.log
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
  .query(`SELECT * FROM movies WHERE id=${id}`)
  .then(([oneMovie]) => {
    if(parseInt(req.params.id) !=0) {
      res.json(oneMovie);
      res.status(200);
  } else {
      res.status(404)
      res.sendStatus("no movie");
  }
  })
  .catch((err)=> {
    //console.error(err);
    res.sendStatus(404);
  })
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?,?,?,?,?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
  

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration} = req.body;

  const updateQuery = `UPDATE movies SET title=?,director=?,year=?,color=?,duration=? WHERE id = ${id};`
  database
    .query(updateQuery,
    [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const delMovie = (req, res) => {

  database
    .query("DELETE FROM movies WHERE id = ?", [parseInt(req.params.id)])
    .then(([result])=>{
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
}

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
  updateMovie,
  delMovie
};
