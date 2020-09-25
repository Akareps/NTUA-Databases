const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.customers_list = function(req, res){
    const sql = `SELECT * FROM Supermarket.Customer`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'), 
            item : results, css : css
        });
    });
};

exports.customersRegisteredInEachStore = function(req, res){
    const sql = `SELECT StoreID, COUNT(*) AS Registered FROM Supermarket.Customer GROUP BY StoreID ORDER BY StoreID`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};

exports.customersDetails = function(req, res){
    const sql = `SELECT * FROM Supermarket.customersDetails`;
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};

exports.customers_advanced_get = function(req, res) {
    res.sendFile(path.join(__dirname, '../public/forms/', 'getCustomerForm.html'));
}

exports.customers_advanced_post = function(req, res) {
    let d = new Date();
    d = d.toISOString().substring(0,10);
    let oneWeekAgo = new Date();
    let oneMonthAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo = oneWeekAgo.toISOString().substring(0,10);
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    oneMonthAgo = oneMonthAgo.toISOString().substring(0,10);
    const cardid = req.body.cid;
    let sql0, sql, sql1, sql2, sql3, sql4;
    sql0 = `SELECT * FROM Supermarket.Customer WHERE Customer.CardID = ${cardid}`
    sql = `SELECT Product_bought_by.Barcode, COUNT(Product_bought_by.Barcode) AS Times_bought FROM Supermarket.Customer LEFT JOIN Supermarket.Customer_transaction ON Customer.CardID = Customer_transaction.CardID LEFT JOIN Supermarket.Product_bought_by ON Product_bought_by.TransactionID = Customer_transaction.TransactionID WHERE Customer.CardID = ${cardid} GROUP BY Product_bought_by.Barcode ORDER BY Times_bought DESC LIMIT 10`;
    sql1 = `SELECT DISTINCT Customer_transaction.StoreID FROM Supermarket.Customer LEFT JOIN Supermarket.Customer_transaction ON Customer.CardID = Customer_transaction.CardID WHERE Customer.CardID = ${cardid}`;
    sql2 = `SELECT Customer_transaction.Time FROM Supermarket.Customer LEFT JOIN Supermarket.Customer_transaction ON Customer.CardID = Customer_transaction.CardID WHERE Customer.CardID = ${cardid}`;
    sql3 = `SELECT AVG(Customer_transaction.Totalcost) AS AverageOfWeek FROM Supermarket.Customer LEFT JOIN Supermarket.Customer_transaction ON Customer.CardID = Customer_transaction.CardID WHERE Customer.CardID = ${cardid} AND (Customer_transaction.date BETWEEN '${oneWeekAgo}' AND '${d}')`;
    sql4 = `SELECT AVG(Customer_transaction.Totalcost) AS AverageOfMonth FROM Supermarket.Customer LEFT JOIN Supermarket.Customer_transaction ON Customer.CardID = Customer_transaction.CardID WHERE Customer.CardID = ${cardid} AND (Customer_transaction.date BETWEEN '${oneMonthAgo}' AND '${d}')`;
    db.query(sql0, (err, results0) => {
        if (err) throw err;
        db.query(sql1, (err, results1) => {
            if (err) throw err;
            db.query(sql2, (err, results2) => {
                if (err) throw err;
                let theTimes = new Array(24).fill(0);
                for(let i in results2) {
                    const as1 = results2[i].Time;
                    const assist = parseInt((as1[0]+as1[1]))
                    theTimes[assist]++;
                }
                for(let i=0;i<24;i++) {
                    theTimes[i]=((theTimes[i]/results2.length)*100).toFixed(2);
                }
                db.query(sql3, (err, results3) => {
                    if (err) throw err;
                    db.query(sql4, (err, results4) => {
                        if (err) throw err;
                        db.query(sql, (err, results) => {
                            if (err) throw err;
                            res.render('show_customer_data', {
                                table: path.basename(__filename, '.js'),
                                item: results, item0: results0, item1: results1, item2: theTimes, item3: results3, item4: results4, css: css
                            });
                        });
                    });
                });
            });
        });
    });
};

exports.customers_create_get = function(req, res) {
    res.sendFile(path.join(__dirname,'../public/forms/insertForm','customerForm.html'));
};


exports.customers_create_post = function(req, res) {
    const sql = `INSERT INTO Supermarket.customer(Bonuspoints, Numberofchildren, Fullname, Maritalstatus, StoreID, BirthDate) VALUES (0, ${req.body.childrennum}, '${req.body.fname}', '${req.body.marriage}', ${req.body.idofstore}, '${req.body.bdate}')`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('successful_action', {action : 'inserted' , type: 'a customer', css : css});
    })
};




exports.customers_update_get = function(req, res){
    res.sendFile(path.join(__dirname,'../public/forms/updateForms','customerUpdateForm.html'));
}

exports.customers_update_post = function(req, res){
    let sql;
    if(req.body.theupdate==="kidnum")
        sql = `UPDATE Supermarket.Customer SET Numberofchildren = ${req.body.childrennum} WHERE CardID = ${req.body.cid}`;
    else if(req.body.theupdate==="smarital")
        sql = `UPDATE Supermarket.Customer SET Maritalstatus = '${req.body.marriage}' WHERE CardID = ${req.body.cid}`;
    else
        sql = `UPDATE Supermarket.Customer SET BonusPoints = ${req.body.cbonus} WHERE CardID = ${req.body.cid}`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('successful_action', {action : 'updated' , type: 'a customer', css : css});
    })
}

exports.customers_delete_get = function(req, res){
    const sql = `SELECT CardID FROM supermarket.Customer ORDER BY CardID`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('delete_customer_form', {item : results, css : css});
    });
}

exports.customers_delete_post = function(req, res){
    let sql = `DELETE FROM supermarket.Customer WHERE CardID = '${req.body.CardID}'`;
    db.query(sql, (err,results)=>{
        if(err) throw err;
        res.render('successful_action', {action : 'deleted' , type: 'a customer', css : css});
    });
}