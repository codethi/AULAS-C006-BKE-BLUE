const express = require("express");
const FilmeSchema = require('./models/Filme');

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

app.get('/filmes', async (req, res) => {
  const filmes = await FilmeSchema.find();
  res.send(filmes);
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
