const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.productCouples = function(req, res){
    const sql = `SELECT a.Barcode1, b.Barcode2, COUNT(*) countForCombination FROM (Select customer_transaction.TransactionID as ctid, Barcode as Barcode1 from supermarket.customer_transaction INNER JOIN supermarket.product_bought_by on customer_transaction.TransactionID = product_bought_by.TransactionID) a INNER JOIN (Select customer_transaction.TransactionID as ctidb, Barcode as Barcode2 from supermarket.customer_transaction INNER JOIN supermarket.product_bought_by on customer_transaction.TransactionID = product_bought_by.TransactionID) b ON a.ctid = b.ctidb AND a.Barcode1 < b.Barcode2 GROUP BY a.Barcode1, b.Barcode2 ORDER BY countForCombination DESC LIMIT 50`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'), 
            item : results, css : css
        });
    });
};