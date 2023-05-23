const mongoose = require("mongoose");

const titulosSchema = new mongoose.Schema({
    nomeTime:{
        type: String,
        require: true
    },
    ano:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model("Titulos", titulosSchema);