// INSTALL SERVER DI LOKAL HOST
const express = require("express");
const movieRouter = require("./routers/movieRouter");
const movcatRouter = require("./routers/movcatRouter");
const categoriesRouter = require("./routers/categoriesRouter");

const app = express();
const port = 2019;

app.use(express.json());
app.use(movieRouter);
app.use(movcatRouter);
app.use(categoriesRouter);

app.get("/", (req, res) => {
  res.send("<h1>Selamat Datang di API Latihan</h1>");
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

// PORT

app.listen(port, () => console.log(`Berhasil Running di ${port} `));
