const mongoose = require("../database/index");

const filmeSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  duracao: {
    type: Number,
    require: true,
  },
});

const Filme = mongoose.model("Filme", filmeSchema);

module.exports = Filme;