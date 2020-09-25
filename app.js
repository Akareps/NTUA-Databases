const express = require('express');
const path = require('path');
const configDatabase = require('./configuration/database');
const configServer = require('./configuration/server');
const logger = require('./middlewares/logger');
const insert = require('./routes/insert');
const show = require('./routes/show');
const deleteit = require('./routes/delete');
const update = require('./routes/update');
const app = express();
const bodyParser = require('body-parser');
const ExpressValidator = require('express-validator');

configServer.openServer(app);
configDatabase.CreateDatabase;
configDatabase.FillDatabase;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(ExpressValidator());


app.use(express.static(path.join(__dirname, 'public'))); // public is static folder middleWares
app.use('/show',show);
app.use('/insert',insert);
app.use('/delete',deleteit);
app.use('/update',update);
//app.use(logger); // INIT middleware

const dateFormat = require('dateformat');