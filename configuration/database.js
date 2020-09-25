const fillDatabase = require('./fillDatabase');
const createDatabase = require('./createDatabase');
const createforeignKeys = require('./createforeignKeys');
const createViews = require('./createViews');
const createIndexes = require('././createIndexes');
const mysql = require('mysql');

//CREDENTIALS
const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : ''
    });
db.connect((err)=>{
    if (err) { 
        throw err;
    }
    console.log('MySQL Connected');
});

//FUNCTIONS    
function CreateDatabase() {createDatabase.createDatabase(db);}
function CreateForeignKeys() {createforeignKeys.createforeignKeys(db);}
function FillDatabase() {fillDatabase.fillDatabase(db);}
function CreateViews() {createViews.createViews(db)}
function CreateIndexes() {createIndexes.createIndexes(db);}

//EXPORTS
module.exports.db = db;
module.exports.CreateDatabase = CreateDatabase();
module.exports.CreateForeignKeys = CreateForeignKeys();
module.exports.FillDatabase = FillDatabase();
module.exports.CreateViews = CreateViews();
module.exports.createIndexes = CreateIndexes();