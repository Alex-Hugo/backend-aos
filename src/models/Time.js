const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    estado:{
        type: String,
        require: true
    },
    cidade:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model("Time", timeSchema);