const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const mysql = require('mysql');
const fs = require('fs');
const css = {
     style : fs.readFileSync('public/style.css','utf8')
};

exports.customer_transactions_list = function(req, res){
    const sql = ' SELECT * FROM `supermarket`.`customer_transaction` INNER join supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID ORDER BY customer_transaction.TransactionID';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'), 
            item : results, css : css
        });
    });
};


exports.customer_transactions_create_get = function(req, res) {
    res.sendFile(path.join(__dirname,'../public/forms/insertForm','customer_transactionsForm.html'));
};

exports.busyHours = function(req, res){
    const sql = `SELECT CONCAT(LEFT(Time,2), ':00 - ', LEFT(Time,2), ':59') AS Hours FROM supermarket.customer_transaction GROUP BY Hours ORDER BY COUNT(Hours) DESC`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};

exports.customer_transactions_create_post = function(req, res){
    let sql, justAVariable;
    let prods2 = new Map();
    const prods = req.body.allproducts.split("\r\n");
    for(let i of prods) {
        if(prods2.has(parseInt(i)))
            prods2.set(parseInt(i),prods2.get(parseInt(i))+1);
        else
            prods2.set(parseInt(i),1);
    }
    sql = `INSERT INTO supermarket.customer_transaction (Totalcost, Time, Date, Methodofpayment, Numofproducts, CardID, StoreID) VALUES (${req.body.totcost}, '${req.body.ttime}', '${req.body.tdate}', '${req.body.pmethod}', ${req.body.pamount}, '${req.body.custid}', ${req.body.idofstore})`
    db.query(sql, (err,results)=> {
        if (err) throw err;
    });
    let sqlsup = `SELECT TransactionID FROM supermarket.customer_transaction ORDER BY TransactionID DESC LIMIT 1`
    db.query(sqlsup, (err,resultsup)=> {
        if (err) throw err;
        justAVariable = resultsup[0].TransactionID;
        for(let i of prods2) {
            sql = `INSERT INTO supermarket.product_bought_by(TransactionID, Barcode, CardID, Amount) VALUES (${justAVariable}, ${i[0]}, '${req.body.custid}', ${i[1]})`
            db.query(sql, (err, resultsup) => {
                if (err) throw err;
            });
        }
        res.render('successful_action', {action : 'inserted' , type: "a customer's transaction", css : css});
    });
};



exports.categories_update_get = function(req,res){
    res.send('categories_update_get');
}

exports.categories_update_post = function(req,res){
    res.send('categories_update_post');
}

exports.categories_delete_get = function(req,res){
    res.send('categories_delete_get');
}

exports.categories_delete_post = function(req,res){
    res.send('categories_delete_post');
}