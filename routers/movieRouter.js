const router = require("express").Router();
const conn = require("../connection");

// ADD MOVIES
router.post("/movies", (req, res) => {
  const sql = `INSERT INTO movies SET ?`;
  const sql2 = `SELECT id, nama_movies, tahun_movies, deskripsi_movies FROM movies WHERE id= ?`;
  const data = req.body;

  // Insert data
  conn.query(sql, data, (err, result1) => {
    // Terdapat error ketika insert
    if (err) {
      return res.send(err);
    }

    //  Read data by user id untuk di kirim sebagai respon
    conn.query(sql2, result1.insertId, (err, result2) => {
      if (err) {
        return res.send(err);
      }
    });
  });
});

// SHOW ALL MOVIES
router.get("/movies", (req, res) => {
  const sql = `select * from movies`;

  conn.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// EDIT MOVIES

router.patch("/movies/:id", (req, res) => {
  const sql = `UPDATE movies SET ?
              WHERE id = ${req.params.id}`;
  const data = req.body;

  conn.query(sql, data, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// DELETE MOVIES
router.delete("/movies/:id", (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const data = req.params.id;

  conn.query(sql, data, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

module.exports = router;
