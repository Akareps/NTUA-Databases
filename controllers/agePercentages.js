const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.agePercentagesGet = function(req, res){
    const sql = `SELECT BirthDate, Time FROM supermarket.customer_transaction INNER JOIN Supermarket.Customer ON customer_transaction.CardID = customer.CardID`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        let d = new Date();
        d = d.toISOString();
        const currentYear = parseInt((d[0]+d[1]+d[2]+d[3]));
        let ages = [];
        for(let i=0;i<12;i++)
            for(let j=0;j<24;j++) {
                if (!ages[i]) ages[i] = [];
                ages[i][j] = 0;
            }
        for(let i in results) {
            const theHour = parseInt((results[i].Time[0]+results[i].Time[1]));
            const customerAge = parseInt((results[i].BirthDate[0]+results[i].BirthDate[1]+results[i].BirthDate[2]+results[i].BirthDate[3]));
            ages[Math.floor((currentYear-customerAge)/10)][theHour]++;
            ages[0][theHour]++;
        }
        for(let i=9;i<21;i++) {
            for(let j=1;j<12;j++) {
                if(ages[0][i]!==0)
                    ages[j][i] = ages[j][i]/ages[0][i];
            }
        }
        res.render('showAgePercentages', {
            table : path.basename(__filename,'.js'),
            item : ages, css : css
        });
    });
};