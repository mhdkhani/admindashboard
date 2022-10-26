const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const expressEjsLayout = require('express-ejs-layouts');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(expressEjsLayout);
require('admindashboardpanel')(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});