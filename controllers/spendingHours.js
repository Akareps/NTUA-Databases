const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.spendingHoursGet = function(req, res) {
    const sql0 = `SELECT Count(*) AS TransNumber FROM supermarket.customer_transaction`;
    db.query(sql0,(err,results0)=>{
        if (err) throw err;
        const sql1 = `SELECT LEFT(Tm, 2) AS Hour FROM (SELECT Time AS Tm FROM supermarket.customer_transaction ORDER BY customer_transaction.Totalcost DESC LIMIT ${Math.round(results0[0].TransNumber*0.2)}) AS HOURS GROUP BY Hour ORDER BY COUNT(*) DESC Limit 3`;
        db.query(sql1,(err,results)=> {
            if (err) throw err;
            res.render('showHours', {
                table: path.basename(__filename, '.js'),
                item: results, css: css
            });
        });
    });
};