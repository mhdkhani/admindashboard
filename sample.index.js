const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const bp = require('body-parser');
const flash = require('express-flash');
var session = require('express-session');
app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));
const port = 3000;
const expressEjsLayout = require('express-ejs-layouts');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(expressEjsLayout);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(flash());
require('admindashboardpanel')(app)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


const mongoConnection = mongoose.connect('mongodb://127.0.0.1/panel',{useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => console.log('connected'))
    .catch((err)=> console.log(err));
module.exports = mongoConnection;