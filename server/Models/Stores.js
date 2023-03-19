const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name : {
        type: String
    },
    x : {
        type : String
    },
    y : {
        type : String
    },
    address : {
        type : String,
        unique : 1,
    },
    storeNumber : {
        type : String
    },
    reviewpoint : {
        type : Number,
        value : 0
    },
    image : {
        type : [String]
    }
})