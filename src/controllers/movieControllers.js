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

module.exports = {
  getMovies,
  getMovieById,
};
