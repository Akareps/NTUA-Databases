const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
     style : fs.readFileSync('public/style.css','utf8')
};

exports.products_in_store_list = function(req, res){
    const sql = ' SELECT * FROM `supermarket`.`products_in_store`';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'), 
            item : results, css : css
        });
    });
};

exports.products_in_store_create_get = function(req, res){
    res.sendFile(path.join(__dirname,'../public/forms/insertForm','products_in_storeForm.html'));
};

exports.products_in_store_create_post = function(req, res){
    if(!req.body.idofstore || !req.body.bcode || !req.body.bcode || !req.body.plabel || !req.body.pshelf)
        throw("Invalid input data");
    const sql = `INSERT INTO supermarket.products_in_store (StoreID, Barcode, Label, Aisle, Shelf) VALUES (${req.body.idofstore}, ${req.body.bcode}, ${req.body.plabel}, ${req.body.paisle}, '${req.body.pshelf}');`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('successful_action', {action : 'inserted' , type: 'a product in a store', css : css});
    })
    
};


exports.products_in_store_update_get = function(req, res){
    res.send('products_in_store_update_get');
}

exports.products_in_store_update_post = function(req, res){
    res.send('products_in_store_update_post');
}

exports.products_in_store_delete_get = function(req, res){
    res.sendFile(path.join(__dirname,'../public/forms/deleteForms','productsInStoreForm.html'));
}

exports.products_in_store_delete_post = function(req, res){
    let sql = `DELETE FROM supermarket.products_in_store WHERE StoreID = ${req.body.storeID} AND Barcode = ${req.body.barcode}`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('successful_action', {action : 'deleted' , type: 'a product from a store', css : css});
    });
}