const mongoose = require('mongoose');


const locationSchema = mongoose.Schema({
    city : {
        type : Number,
    },
    country : {
        type: String,
        unique : 1,
    },
})


const Location = mongoose.model('Location', locationSchema);
module.exports = { Location };