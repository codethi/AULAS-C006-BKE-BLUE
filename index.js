// Baixar o express no terminal com o comando: npm i express
const express = require("express"); // importa o módulo express do node_modules
const app = express(); // cria o nosso objeto app, que vai poder utilizar tudo o que o express possui

app.use(express.json()); // Converte requisições e repostas para JSON (JavaScript Object Notation)

const port = 3000; // constante para salvar a porta do servidor;

const filmes = [
  {
    id: 1,
    nome: "Capitão America",
    duracao: 160,
  },
  {
    id: 2,
    nome: "Capitã Marvel",
    duracao: 200,
  },
];


// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

// GET / - home
app.get("/", (req, res) => {
  // rota de GET, recebe o nome da rota e uma função de callback com requisição ao servidor e resposta do servidor.
  res.status(200).send({ hello: "Hello World Express"}); // Responde na tela um texto.
});

// GET /filmes - Retornar a lista de filmes
app.get("/filmes", (req, res) => {
  res.json({ filmes }); // .json converte nosso array ou objeto para JSON
});


// GET /filmes/{id} - Retornar a lista de filmes pelo ID
app.get("/filmes/:idFilme", (req, res) => { // Rota com recebimento de parametro (:id)
  const id = +req.params.idFilme;
  const filme = filmes.find(filme => filme.id === id);

  !filme ? res.status(404).send({ error: "Filme não existe"}) : res.json({filme});
});

// POST - /filmes - Criar um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body; // Pego o JSON inteiro do body e insiro na const filme (desse lado é convertido para um obejto "normal" de js)

  if (!filme || !filme.nome || !filme.duracao)
    res.status(400).send({ error: 'Filme inválido!'})

  filmes.push(filme);
  res.status(201).send({ resp: "Filme inserido com sucesso!"});
});

// PUT - /filmes/{id} - Altera um filme pelo ID
app.put("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  const filme = req.body.filme;
  filmes[id] = filme;
  res.send("Filme alterado com sucesso!");
});

// Delete - filmes/{id} - apagar um filme pelo ID
app.delete("/filmes/:id", (req, res) => {
  const id = req.params.id - 1;
  delete filmes[id];
  res.send("Filme apagado com sucesso!");
});

/* 
A função listen do objeto app serve para "ligar" o nosso back-end ou servir o nosso back-end
É obrigatório que essa chamada de função esteja SEMPRE no final do nosso código! */
app.listen(port, () => {
  // recebe dois parametros, a porta e um função de callback para principalmente mostra um mensagem no console.
  console.log(`Servidor rodando em http://localhost:${port}`);
});
