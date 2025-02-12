const connection = require("../data/db");
const path = require("path");
const fs = require("fs");

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

const storeReview = (req, res) => {
  const id = req.params.id;
  const { name, vote, text } = req.body;

  const sql =
    "INSERT INTO reviews (name, text, vote, movie_id) VALUES (?, ?, ?, ?)";

  connection.query(sql, [name, text, vote, id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Errore nella query" });
    }
    res.status(201);
    res.json({ message: "Recensione aggiunta", id: results.insertId });
  });
};

const store = (req, res) => {
  const { title, director, genre, abstract } = req.body;
  const imgName = req.file.filename;

  const sql =
    "INSERT INTO movies (title, director, genre, abstract, image) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [title, director, genre, abstract, imgName],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Errore nella query" });
      }
      res.status(201);
      res.json({ message: "Film aggiunto" });
    }
  );
};

const update = (req, res) => {
  res.send("film aggiornato");
};

const destroy = (req, res) => {
  const id = req.params.id;

  const sqlSelect = "SELECT image FROM movies WHERE id = ?";
  const sql = "DELETE FROM movies WHERE id = ?";

  connection.query(sqlSelect, [id], (err, results) => {
    const imgName = results[0].image;
    const imgPath = path.join(__dirname, "../public/movies_cover", imgName);

    //elimino immagine
    fs.unlink(imgPath, (err) => {
      console.log(err);
    });

    //elimino film
    connection.query(sql, [id], (err) => {
      if (err) return res.status(500).json({ error: "Errore nella query" });
      res.json({ message: "Film Eliminato" });
    });
  });
};

module.exports = {
  index,
  show,
  storeReview,
  store,
  update,
  destroy,
};
