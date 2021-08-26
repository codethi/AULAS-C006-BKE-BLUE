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

module.exports = filmeSchema;