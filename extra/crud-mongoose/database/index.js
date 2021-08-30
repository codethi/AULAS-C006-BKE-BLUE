const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/db_filmes", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

module.exports = mongoose;