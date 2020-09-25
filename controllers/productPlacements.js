const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.productPlacementsGet = function(req, res) {
    res.sendFile(path.join(__dirname,'../public/forms/', 'productPlacementsForm.html'));
};

exports.productPlacementsPost = function(req, res){
    const sql = `SELECT COUNT(product_bought_by.Barcode) timesBoughtFromPlacement, Aisle, Shelf FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.StoreID = ${req.body.storeID} AND products_in_store.Barcode = product_bought_by.Barcode WHERE customer_transaction.StoreID = ${req.body.storeID} GROUP BY Aisle, Shelf ORDER BY timesBoughtFromPlacement DESC`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};