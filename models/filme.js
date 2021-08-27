const mongoose = require("../database/index");

const FilmeSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  duracao: {
    type: Number,
    require: true,
  },
});

const Filme = mongoose.model("Filme", FilmeSchema);

module.exports = Filme;