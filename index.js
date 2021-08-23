const express = require("express"); // Baixar o express no terminal com o comando: npm i express
const app = express();

app.use(express.json()); // Converter requisição para JavaScript Object Notation (JSON)

const port = 3000 // constante para salvar a porta do servidor;
const filmes = [
    "Capitão America", 
    "Capitã Marvel", 
    "Pantera Negra"
];

// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

// GET / - home
app.get("/", (req, res) => { // rota de GET, recebe o nome da rota e uma função de callback com requisição ao servidor e resposta do servidor.
  res.send("Hello World Express"); // Responde na tela um texto.
});

// GET /filmes - Retornar a lista de filmes
app.get("/filmes", (req, res) => {
  res.send(filmes);
});

// GET /filmes/{id} - Retornar a lista de filmes pelo ID
app.get("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  const filme = filmes[id];

  !filme ? res.send("Filme não existe") : res.send(filme);
});

// POST - /filmes - Criar um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body.filme;
  filmes.push(filme);
  res.send("Filme inserido com sucesso!");
});

// PUT - /filmes/{id} - Altera um filme pelo ID
app.put("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  const filme = req.body.filme;
  filmes[id] = filme
  res.send("Filme alterado com sucesso!");
});

// Delete - filmes/{id} - apagar um filme pelo ID
app.delete("/filmes/:id", (req, res) => {
    const id = req.params.id - 1;
    delete filmes[id]
    res.send("Filme apagado com sucesso!");
})



/* 
A função listen do objeto app serve para "ligar" o nosso back-end ou servir o nosso back-end
É obrigatório que essa chamada de função esteja SEMPRE no final do nosso código! */
app.listen(port, () => { // recebe dois parametros, a porta e um função de callback para principalmente mostra um mensagem no console.
  console.log(`Servidor rodando em http://localhost:${port}`)
});