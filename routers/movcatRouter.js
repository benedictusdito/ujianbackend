const router = require("express").Router();
const conn = require("../connection");

// ADD MOVCAT

router.post("/movcat", (req, res) => {
  const sql = `INSERT INTO movcat SET ?`;
  const sql2 = `SELECT id, nama_kategori FROM categories WHERE id= ?`;
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

// DELETE MOVCAT

router.delete("/movies/:id", (req, res) => {
  const sql = `DELETE FROM movies WHERE id = ?`;
  const data = req.params.id;

  conn.query(sql, data, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

module.exports = router;
