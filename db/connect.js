const mongoose = require("mongoose");
const mongoConnection = mongoose.connect('mongodb://127.0.0.1/panel',{useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => console.log('connected to mongo'))
    .catch((err)=> console.log(err));
module.exports = mongoConnection;