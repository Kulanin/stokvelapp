
const mongoose = require("mongoose");

//Create a schema
const Schema =  mongoose.Schema;
const Pfuxanai_Stokvel = new Schema({

    firstname: String,
    lastname: String,
    password: String,
    username: String,
    cell: String,
    date: [String],
    amount: [Number]  
})

//Define a Model
const Pfuxanai_StokvelModel = mongoose.model("Stokvel",Pfuxanai_Stokvel);

module.exports = Pfuxanai_StokvelModel;