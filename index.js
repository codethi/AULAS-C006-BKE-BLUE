const express = require("express");
const mongoose = require("mongoose");
const filmeSchema = require("./models/filme");

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

app.get("/filmes", async (req, res) => {
  const filmes = await filmeSchema.filmeSchema.find();
  res.send(filmes);
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
