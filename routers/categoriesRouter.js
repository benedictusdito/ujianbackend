const router = require("express").Router();
const conn = require("../connection");

// ADD CATEGORIES
router.post("/categories", (req, res) => {
  const sql = `INSERT INTO categories SET ?`;
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

//   SHOW ALL CATEGORIES
router.get("/category", (req, res) => {
  const sql = `select * from categories`;

  conn.query(sql, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// DELETE CATEGORIES

router.delete("/categories/:id", (req, res) => {
  const sql = `DELETE FROM categories WHERE id = ?`;
  const data = req.params.id;

  conn.query(sql, data, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

// EDIT CATEGORIES

router.patch("/categories/:id", (req, res) => {
  const sql = `UPDATE categories SET ?
                WHERE id = ${req.params.id}`;
  const data = req.body;

  conn.query(sql, data, (err, result) => {
    if (err) return res.send(err);

    res.send(result);
  });
});

module.exports = router;
