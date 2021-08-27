const express = require("express");
const FilmeSchema = require("./models/Filme");
const mongoose = require("./database")

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ info: "Hello MongoDB" });
});

// [GET] /filmes - Retornar a lista de filmes no nosso banco de dados!
app.get("/filmes", async (req, res) => {
  const filmes = await FilmeSchema.find();
  res.send({ filmes });
});

// [GET] /filmes/:id - Retornar um unico filme pelo ID
app.get('/filmes/:id', async (req, res) => {
  const id = req.params.id;

  // Verificar se o id recebido no parametro é um ID válido:
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(422).send({error: 'Id inválido'});
    return;
  }

  // Buscar no mongodb o document que possui o id recebido pela req.param
  const filme = await FilmeSchema.findById(id);

  // Verificar se o document foi encontrado:
  if(!filme){
    res.status(404).send({erro: "Filme não encontrado!"})
    return;
  }

  res.send({filme})

})


app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
