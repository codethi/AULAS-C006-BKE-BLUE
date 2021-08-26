const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/db_filmes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = mongoose;