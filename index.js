const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

app.listen(port, () =>
  console.log(`Serivodr rodando em http://localhost:${port}`)
);
