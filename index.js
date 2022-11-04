const express = require('express')
const app = express();
const path = require('path');
const Helper = require("./helper/data");
const mongoose = require("mongoose");
module.exports = function(app){
    const mongoConnection = mongoose.connect('mongodb://127.0.0.1/panel',{useNewUrlParser: true, useUnifiedTopology : true})
        .then(() => console.log('connected to mongo'))
        .catch((err)=> console.log(err));
    module.exports = mongoConnection;
    app.use('/css', express.static(path.join(__dirname, 'assets/css')))
    app.use('/plugins', express.static(path.join(__dirname, 'assets/plugins')))
    app.use('/js', express.static(path.join(__dirname, 'assets/js')))
    app.set('views', path.join(__dirname, "views"));
    app.all('/adminpanel/*', (req, res, next) => {
        var isLoggedIn = Helper.isAdminLoggedIn(req);
        var path = req.path;
        if (!isLoggedIn && !path.includes("login") && !path.includes("logout") ){
            return res.redirect('/adminpanel/login');
        }else{
            next();
        }
    });
    app.use('/adminpanel',require('./routes/adminRoutes'));
};
