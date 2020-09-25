const database = require('./../configuration/database');
const db = database.db;
const path = require('path');
const fs = require('fs');
const css = {
    style: fs.readFileSync('public/style.css', 'utf8')
};

exports.Store_list = function(req,res){
    const sql = 'SELECT * FROM `supermarket`.`Store` ORDER BY StoreID';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'), 
            item : results, css : css
        });
    });
};

exports.sales_create_get = function(req, res){
    const sql = "SELECT StoreID FROM Supermarket.store"
    db.query(sql,(err,results1)=>{
        if (err) throw err;
            res.render('request_sales_form', { row1 : results1, css : css});
    });
};

exports.salesPerCategoryList = function(req, res){
    const sql = "SELECT * FROM supermarket.salespercategory";
    db.query(sql,(err,results)=>{
        if (err) throw err;
        res.render('show_data', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};

exports.sales_create_post = function(req, res) {
    let sql;
    const err1 = "Please insert both limits";
    const err2 = "Lower limit must be lower or equal to higher limit";
    const todate = req.body.saledateto;
    const StoreID = (req.body.Storecopy);
    const fromdate = req.body.saledatefrom;
    if((fromdate && !todate) || (!fromdate && todate))
        throw(err1);
    else if(fromdate && todate) {
        const frd = fromdate.split("-");
        const tod = todate.split("-");
        if(parseInt(frd[0])>parseInt(tod[0])) throw(err2);
        else if (parseInt(frd[0])===parseInt(tod[0]) && parseInt(frd[1]) > parseInt(tod[1])) throw(err2);
        else if(parseInt(frd[0])===parseInt(tod[0]) && parseInt(frd[1])===parseInt(tod[1]) && parseInt(frd[2]) > parseInt(tod[2])) throw(err2);
    }
    const prodamountmin = req.body.productamountmin;
    const prodamountmax = req.body.productamountmax;
    if((prodamountmax && !prodamountmin) || (prodamountmin && !prodamountmax))
        throw(err1);
    else if(prodamountmax && prodamountmin && parseInt(prodamountmin) > parseInt(prodamountmax))
        throw(err2);
    const salamountmin = req.body.salecostmin;
    const salamountmax = req.body.salecostmax;
    if((salamountmin && !salamountmax) || (salamountmax && !salamountmin))
        throw(err1);
    else if(salamountmin && salamountmax && parseInt(salamountmin) > parseInt(salamountmax))
        throw(err2);
    const paymentmethod = req.body.paymentmethod;
    if(paymentmethod !== "" && paymentmethod !== "Card" && paymentmethod !== "Cash")
        throw("Wrong payment method");
    const category = req.body.productcategory;
    if(category !== "" && category !== "House" && category !== "Fridge" && category !== "Fresh" && category !== "Cellar" && category !== "Pet" && category !== "Hygiene")
        throw("Wrong category");
    if(prodamountmin && todate && salamountmax && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && salamountmax && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && salamountmax && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && prodamountmax && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && todate && salamountmax && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && todate && salamountmax && paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(salamountmax && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && salamountmax && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && salamountmax && paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && salamountmax && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && salamountmax &&  paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && prodamountmin && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && prodamountmin && paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && prodamountmin && salamountmax)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) ORDER BY customer_transaction.TransactionID`;
    else if(paymentmethod && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Methodofpayment = '${paymentmethod}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(salamountmax && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(salamountmax && paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin && salamountmax)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) ORDER BY customer_transaction.TransactionID`;
    else if(todate && prodamountmin)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) AND (Date BETWEEN '${fromdate}' AND '${todate}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && salamountmax)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) ORDER BY customer_transaction.TransactionID`;
    else if(todate && paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(todate && category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else if(todate)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Date BETWEEN '${fromdate}' AND '${todate}') ORDER BY customer_transaction.TransactionID`;
    else if(prodamountmin)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Numofproducts BETWEEN  ${prodamountmin} AND ${prodamountmax}) ORDER BY customer_transaction.TransactionID`;
    else if(salamountmax)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Totalcost BETWEEN ${salamountmin} AND ${salamountmax}) ORDER BY customer_transaction.TransactionID`;
    else if(paymentmethod)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Methodofpayment = '${paymentmethod}') ORDER BY customer_transaction.TransactionID`;
    else if(category)
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) AND (Kind  = '${category}') ORDER BY customer_transaction.TransactionID`;
    else
        sql = `SELECT * FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product on product_bought_by.Barcode = product.Barcode WHERE (supermarket.customer_transaction.StoreID = ${req.body.Storecopy}) ORDER BY customer_transaction.TransactionID`;

    db.query(sql, (err, results)=>{
        if (err) throw err;
        res.render('successful_action2', {
            table : path.basename(__filename,'.js'),
            item : results, css : css
        });
    });
};
