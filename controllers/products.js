const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const {validationResult} = require('express-validator/check');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.products_list = function(req, res){
    const sql = ' SELECT * FROM `supermarket`.`product`';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'), 
            item : results, css : css
        });
    });
};

exports.products_create_get = function(req, res){
    res.sendFile(path.join(__dirname,'../public/forms/insertForm', 'productForm.html'));
};

exports.products_create_post = function(req, res) {
    if(!req.body.bcode || !req.body.pname || !req.body.pprice || !req.body.ptype || !"HouseFridgeFreshCellarPetHygiene".includes(req.body.ptype))
        throw("Invalid input data")
    let sql =`INSERT INTO supermarket.product (Barcode, Productname, Currentprice, Kind) VALUES (${req.body.bcode}, '${req.body.pname}', ${req.body.pprice}, '${req.body.ptype}')`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('successful_action', {action : 'inserted' , type: 'product', css : css});
    })
};

exports.products_update_get = function(req, res){
    res.sendFile(path.join(__dirname,'../public/forms/updateForms','productUpdateForm.html'));
}

exports.products_update_post = function(req, res){
    let sql;
    if(req.body.theupdate==="pname") {
        sql = `UPDATE Supermarket.product SET Productname = '${req.body.prodname}' WHERE Barcode = ${req.body.bcode}`;
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('successful_action', {action: 'updated', type: 'product', css: css});
        });
    }
    else {
        const sql1 = `SELECT Currentprice FROM supermarket.product WHERE Barcode = ${req.body.bcode}`
        db.query(sql1, (err, results) => {
            if (err) throw err;
            const supportme = results[0].Currentprice;
            const sql2 = `INSERT INTO Supermarket.price_history(Endingdate, Oldprice, Barcode) VALUES('${req.body.pdate}', ${supportme}, ${req.body.bcode}) `;
            db.query(sql2, (err, results) => {
                if (err) throw err;
            });
        });
        sql = `UPDATE Supermarket.product SET Currentprice = ${req.body.prodprice} WHERE Barcode = ${req.body.bcode}`;
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.render('successful_action', {action: 'updated', type: 'product', css: css});
        });
    }
}

exports.products_delete_get = function(req, res){
    const sql = `SELECT Barcode FROM supermarket.product ORDER BY Barcode`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('delete_product_form', {item : results, css : css});
    });
}

exports.products_delete_post = function(req, res){
    let sql = `DELETE FROM supermarket.product WHERE Barcode = '${req.body.Barcode}'`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
       res.render('successful_action', {action : 'deleted' , type: 'a product', css : css});
    });
}