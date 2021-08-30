const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

(async () => {
	const app = express();
	app.use(express.json());
	const port = 3000;
	const connectionString = `mongodb://localhost:27017/blue_db`;

	const options = {
		useUnifiedTopology: true,
	};

	const client = await mongodb.MongoClient.connect(connectionString, options);

	const db = client.db("blue_db");
	const personagens = db.collection("personagens");

    const getPersonagensValidas = () => personagens.find({}).toArray();

  // const getPersonagemById = async(id) => personagens.findOne({_id: ObjectId(id)});

	app.get("/", (req, res) => {
		res.send({ info: "Olá, Blue" });
	});

    //[GET] GetAllPersonagens

    app.get("/personagens", async (req, res) => {
        res.send(await getPersonagensValidas())
    });

	app.listen(port, () => {
		console.info(`App rodando em http://localhost:${port}`);
	});
})();
