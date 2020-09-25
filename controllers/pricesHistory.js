const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.priceHistoryGet = function(req, res) {
    res.sendFile(path.join(__dirname, '../public/forms/', 'getPriceHistoryForm.html'));
}

exports.pricesHistoryList = function(req, res) {
    const sql = `SELECT * FROM supermarket.price_history WHERE Barcode = ${req.body.bcode} ORDER BY Endingdate DESC`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};

