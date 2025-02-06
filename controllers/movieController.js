const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (error, results) => {
    if (error) return res.status(500).json({ error: "Errore nella query" });
  });
};

const show = (req, res) => {
  const id = req.params.id;

  const sqMovie = "SELECT * FROM movies WHERE id = ?";
  connection.query(sqMovie, [id], (error, results) => {
    if (error) return res.status(500).json({ error: "Errore nella query" });
    if (results.lenght === 0)
      return res.status(404).json({ error: "Film non trovato" });
    res.json(results[0]);
  });
};

module.exports = {
  index,
  show,
};
