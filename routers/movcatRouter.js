const router = require("express").Router();
const conn = require("../connection");

// ADD MOVCAT

router.post("/movcat", (req, res) => {
  const sql = `INSERT INTO movcat(movie_id, category_id) VALUES (${
    req.body.movie_id
  }, ${req.body.category_id})`;
  const sql2 = `SELECT movcat.id, movies.nama_movies, tahun_movies, deskripsi_movies FROM movies 
  JOIN movcat ON movies.id = movcat.movie_id
  JOIN categories ON categories.id = movcat.category_id`;

  // Insert data
  conn.query(sql, (err, result) => {
    // Terdapat error ketika insert
    if (err) return res.send(err);

    //  Read data by user id untuk di kirim sebagai respon
    conn.query(sql2, (err, result2) => {
      if (err) return res.send(err);
      res.send(result2);
    });
  });
});

// DELETE MOVCAT

router.delete("/movcat/:id", (req, res) => {
  const sql = `DELETE FROM movcat WHERE id = ?`;
  const data = req.params.id;

  conn.query(sql, data, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

module.exports = router;
