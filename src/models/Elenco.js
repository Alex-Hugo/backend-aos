const mongoose = require("mongoose");

const elencoSchema = new mongoose.Schema({
    times_id:{
        type: String,
        require: true
    },
    jogador1:{
        type: String,
        require: true
    },
    jogador2:{
        type: String,
        require: true
    },
    jogador3:{
        type: String,
        require: true
    },
    jogador4:{
        type: String,
        require: true
    },
    estrelaTime:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model("Elenco", elencoSchema);