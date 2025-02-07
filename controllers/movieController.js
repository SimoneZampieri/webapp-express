const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (error, results) => {
    if (error) return res.status(500).json({ error: "Errore nella query" });
    res.json(
      results.map((movie) => ({
        ...movie,
        image: req.imagePath + movie.image,
      }))
    );
  });
};

const show = (req, res) => {
  const id = req.params.id;

  const sqMovie = "SELECT * FROM movies WHERE id = ?";
  const sqReview = "SELECT * FROM reviews WHERE movie_id = ?";

  connection.query(sqMovie, [id], (error, results) => {
    if (error) return res.status(500).json({ error: "Errore nella query" });
    if (results.length === 0)
      return res.status(404).json({ error: "Film non trovato" });

    let movie = results[0];

    connection.query(sqReview, [id], (error, reviewResults) => {
      if (error) return res.status(500).json({ error: "Errore nella query" });
      movie.reviews = reviewResults;

      res.json({
        ...movie,
        image: req.imagePath + movie.image,
      });
    });
  });
};

const store = (req, res) => {
  res.send("Film Inserito");
};

const update = (req, res) => {
  res.send("film aggiornato");
};

const destroy = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM movies WHERE id = ?";
  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Errore nella query" });
    res.json({ message: "Film Eliminato" });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
