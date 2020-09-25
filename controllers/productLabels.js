const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.productLabelsTrustedGet = function(req, res) {
    const sql1 = `SELECT AVG(LABEL) AS Percentage FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.Barcode = product_bought_by.Barcode INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode WHERE customer_transaction.StoreID = products_in_store.StoreID AND Kind = 'Fridge'`;
    const sql2 = `SELECT AVG(LABEL) AS Percentage FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.Barcode = product_bought_by.Barcode INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode WHERE customer_transaction.StoreID = products_in_store.StoreID AND Kind = 'Fresh'`;
    const sql3 = `SELECT AVG(LABEL) AS Percentage FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.Barcode = product_bought_by.Barcode INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode WHERE customer_transaction.StoreID = products_in_store.StoreID AND Kind = 'Cellar'`;
    const sql4 = `SELECT AVG(LABEL) AS Percentage FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.Barcode = product_bought_by.Barcode INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode WHERE customer_transaction.StoreID = products_in_store.StoreID AND Kind = 'Hygiene'`;
    const sql5 = `SELECT AVG(LABEL) AS Percentage FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.Barcode = product_bought_by.Barcode INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode WHERE customer_transaction.StoreID = products_in_store.StoreID AND Kind = 'House'`;
    const sql6 = `SELECT AVG(LABEL) AS Percentage FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.products_in_store ON products_in_store.Barcode = product_bought_by.Barcode INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode WHERE customer_transaction.StoreID = products_in_store.StoreID AND Kind = 'Pet'`;

    db.query(sql1,(err,results1)=>{
        if (err) throw err;
        db.query(sql2,(err,results2)=>{
            if (err) throw err;
            db.query(sql3,(err,results3)=>{
                if (err) throw err;
                db.query(sql4,(err,results4)=>{
                    if (err) throw err;
                    db.query(sql5,(err,results5)=>{
                        if (err) throw err;
                        db.query(sql6,(err,results6)=>{
                            if (err) throw err;
                            res.render('trustedLabels', {
                                table : path.basename(__filename,'.js'),
                                item1 : results1, item2 : results2, item3 : results3, item4 : results4, item5 : results5, item6 : results6, css : css
                            });
                        });
                    });
                });
            });
        });
    });
};