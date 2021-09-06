const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
require("dotenv").config();
require("express-async-errors");
var cors = require("cors");
//requires de endpoints
const home = require("./components/home/home");

(async () => {
	const dbUser = process.env.DB_USER;
	const dbPassword = process.env.DB_PASSWORD;
	const dbName = process.env.DB_NAME;
	const dbChar = process.env.DB_CHAR;

	const app = express();
	app.use(express.json());

	const port = process.env.PORT || 3000;
	const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

	const options = {
		useUnifiedTopology: true,
	};

	console.info("Conectando ao MongoDB Atlas...");

	const client = await mongodb.MongoClient.connect(connectionString, options);

	console.info("Conexão estabelecida com o MongoDB Atlas!");

	const db = client.db("blue_db");
	const personagens = db.collection("personagens");

	const getPersonagensValidas = () => personagens.find({}).toArray();

	const getPersonagemById = async (id) =>
		personagens.findOne({ _id: ObjectId(id) });

	//Construindo o liberação do CORS - ANTIGO

/* 	app.all("/*", (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");

		res.header("Access-Control-Allow-Methods", "*");

		res.header(
			"Access-Control-Allow-Headers",
			"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
		);

		next();
	});
 */

//CORS - NOVO
//Liberar o CORS  em todas as nossas requisições
app.use(cors());
//Ativar todos os pre-flights
app.options("*", cors());

	//Criando a rota Home
	app.use("/home", home);

	//[GET] GetAllPersonagens

	app.get("/personagens", async (req, res) => {
		res.send(await getPersonagensValidas());
	});

	//[GET] getPersonagemById

	app.get("/personagens/:id", async (req, res) => {
		const id = req.params.id;
		const personagem = await getPersonagemById(id);
		if (!personagem) {
			res
				.status(404)
				.send({ error: "O personagem especificado não foi encontrado" });
			return;
		}
		res.send(personagem);
	});

	//[POST] Adicona personagem
	app.post("/personagens", async (req, res) => {
		const objeto = req.body;

		if (!objeto || !objeto.nome || !objeto.imagemUrl) {
			res.status(400).send({
				error:
					"Personagem inválido, certifique-se que tenha os campos nome e imagemUrl",
			});
			return;
		}

		const result = await personagens.insertOne(objeto);

		console.log(result);
		//Se ocorrer algum erro com o mongoDb esse if vai detectar
		if (result.acknowledged == false) {
			res.status(500).send({ error: "Ocorreu um erro" });
			return;
		}

		res.status(201).send(objeto);
	});

	//[PUT] Atualizar personagem
	app.put("/personagens/:id", async (req, res) => {
		const id = req.params.id;
		const objeto = req.body;

		if (!objeto || !objeto.nome || !objeto.imagemUrl) {
			res.status(400);
			send({
				error:
					"Requisição inválida, certifique-se que tenha os campos nome e imagemUrl",
			});
			return;
		}

		const quantidadePersonagens = await personagens.countDocuments({
			_id: ObjectId(id),
		});

		if (quantidadePersonagens !== 1) {
			res.status(404).send({ error: "Personagem não encontrado" });
			return;
		}

		const result = await personagens.updateOne(
			{
				_id: ObjectId(id),
			},
			{
				$set: objeto,
			}
		);
		//console.log(result);
		//Se acontecer algum erro no MongoDb, cai na seguinte valiadação
		if (result.acknowledged == "undefined") {
			res
				.status(500)
				.send({ error: "Ocorreu um erro ao atualizar o personagem" });
			return;
		}
		res.send(await getPersonagemById(id));
	});

	//[DELETE] Deleta um personagem
	app.delete("/personagens/:id", async (req, res) => {
		const id = req.params.id;
		//Retorna a quantidade de personagens com o filtro(Id) especificado
		const quantidadePersonagens = await personagens.countDocuments({
			_id: ObjectId(id),
		});
		//Checar se existe o personagem solicitado
		if (quantidadePersonagens !== 1) {
			res.status(404).send({ error: "Personagem não encontrao" });
			return;
		}
		//Deletar personagem
		const result = await personagens.deleteOne({
			_id: ObjectId(id),
		});
		//Se não consegue deletar, erro do Mongo
		if (result.deletedCount !== 1) {
			res
				.status(500)
				.send({ error: "Ocorreu um erro ao remover o personagem" });
			return;
		}

		res.send(204);
	});

	//Tratamento de erros
	//Middleware verificar endpoints
	app.all("*", function (req, res) {
		res.status(404).send({ message: "Endpoint was not found" });
	});

	//Middleware -> Tratamento de erro
	app.use((error, req, res, next) => {
		res.status(error.status || 500).send({
			error: {
				status: error.status || 500,
				message: error.message || "Internal Server Error",
			},
		});
	});

	app.listen(port, () => {
		console.info(`App rodando em http://localhost:${port}/home`);
	});
})();
