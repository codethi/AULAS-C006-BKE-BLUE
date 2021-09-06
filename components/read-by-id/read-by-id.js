const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
(async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbChar = process.env.DB_CHAR;
  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.${dbChar}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const options = {
    useUnifiedTopology: true,
  };
  const client = await mongodb.MongoClient.connect(connectionString, options);

  const db = client.db("blue_db");
  const personagens = db.collection("personagens");

  const getPersonagemById = async (id) =>
    personagens.findOne({ _id: ObjectId(id) });

  //Middleware - especifica que é esse o import do router no index que queremos utilizar
  router.use(function timelog(req, res, next) {
    next();
    console.log("Time: ", Date.now());
  });


//[GET] GetPersonagensById

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const personagem = await getPersonagemById(id);
    if (!personagem) {
      res
        .status(404)
        .send({ error: "O personagem especificado não foi encontrado" });
      return;
    }
    res.send(personagem);
  });
})();
  

module.exports = router;