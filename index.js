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

// Função responsável por filtrar apenas os filmes que possuem valores válidos, ou seja, não são null.
const getFilmesValidos = () => filmes.filter(Boolean);

// Função responsável por fazer o getById de filmes:
const getFilmeById = id => getFilmesValidos().find(filme => filme.id === id); 

// Função responsável por fazer o getByIndex de filmes:
const getFilmeIndexById = id => getFilmesValidos().findIndex(filme => filme.id === id)

// CRUD - Create[POST] - Read[GET] - Update[PUT] - Delete[DELETE]

// GET / - home
app.get("/", (req, res) => {
  // rota de GET, recebe o nome da rota e uma função de callback com requisição ao servidor e resposta do servidor.
  res.status(200).send({ hello: "Hello World Express" }); // Responde na tela um texto.
});

// GET /filmes - Retornar a lista de filmes
app.get("/filmes", (req, res) => {
  res.json({ filmes }); // .json converte nosso array ou objeto para JSON
});

// GET /filmes/{id} - Retornar a lista de filmes pelo ID
app.get("/filmes/:idFilme", (req, res) => {
  // Rota com recebimento de parametro (:id)
  const id = +req.params.idFilme;
  const filme = getFilmeById(id)

  !filme
    ? res.status(404).send({ error: "Filme não existe" })
    : res.json({ filme });
});

// POST - /filmes - Criar um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body; // Pego o JSON inteiro do body e insiro na const filme (desse lado é convertido para um obejto "normal" de js)

  if (!filme || !filme.nome || !filme.duracao) {
    res.status(400).send({ error: "Filme inválido!" });
    return;
  }

  // Pega o último elemento da lista filmes
  const ultimoFilme = filmes[filmes.length - 1];

  console.log(filmes.length)

  // Testa se a lista não está vazia
  if (filmes.length) { // Se o retorno de filmes.length for 0 faça...  (0 == false)
    // Pegar o valor do ultimo id disponivel e somar + 1
    filme.id = ultimoFilme.id + 1;
    filmes.push(filme); // Insere o objeto filme no array filmes
  } else {
    // Caso a lista esteja vazia o valor de id é 1
    filme.id = 1;
    filmes.push(filme);// Insere o objeto filme no array filmes
  }

  res.status(201).send({ filme });
});

// PUT - /filmes/{id} - Altera um filme pelo ID
app.put("/filmes/:id", (req, res) => {
  const id = +req.params.id;

  // findIndex retorna a posição do objeto dentro do array(filmes), caso não exista, retorna -1
  const filmeIndex = getFilmeIndexById(id)

  // Validação para verificar se o filme existe no array
  if (filmeIndex < 0) {
    res.status(404).send({error: "Filme não encontrado."});
    return;
  }

  // Pega o objeto JSON enviado no body da requisição
  const novoFilme = req.body;

  // Valida se todos os campos necessários foram enviados.
  if (!novoFilme || !novoFilme.nome || !novoFilme.duracao) {
    res.status(400).send({ error: "Filme inválido!" });
    return;
  }

  // Procuro o filme cadastrado no meu array, pelo id passado no parametro, e insiro o objeto inteiro, dentro da const filme.
  const filme = getFilmeById(id)
  
  // Adiciona o id do filme antigo no filme novo:
  novoFilme.id = filme.id
  // Insere o filme novo, na posição encontrada findIndex, do array.
  filmes[filmeIndex] = novoFilme 

  res.send({ message: "Filme alterado com sucesso!"});
});

// Delete - filmes/{id} - apagar um filme pelo ID
app.delete("/filmes/:id", (req, res) => {
  const id = +req.params.id;

  const filmeIndex = getFilmeIndexById(id)
  if (filmeIndex < 0) {
    res.status(404).send({error: "Filme não encontrado."});
    return;
  }

  // O Splice recebe dois parametros, a posição do valor a ser apagada e "quantos" valores quero apagar depois desse na minha lista, se eu quiser apagar apenas ele mesmo, colo o numero 1.
  filmes.splice(filmeIndex, 1);

  res.send({ message: "Filme apagado com sucesso!"});
});

/* 
A função listen do objeto app serve para "ligar" o nosso back-end ou servir o nosso back-end
É obrigatório que essa chamada de função esteja SEMPRE no final do nosso código! */
app.listen(port, () => {
  // recebe dois parametros, a porta e um função de callback para principalmente mostra um mensagem no console.
  console.log(`Servidor rodando em http://localhost:${port}`);
});
