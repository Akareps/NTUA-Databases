function createViews(db) {

    let sql = `CREATE VIEW Supermarket.salesPerCategory AS SELECT customer_transaction.StoreID, Kind, COUNT(*) as totalProductsSold FROM supermarket.customer_transaction INNER JOIN supermarket.product_bought_by ON customer_transaction.TransactionID = product_bought_by.TransactionID INNER JOIN supermarket.product ON product_bought_by.Barcode = product.Barcode GROUP BY customer_transaction.StoreID, KIND ORDER BY customer_transaction.StoreID`;

    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    sql = `CREATE VIEW Supermarket.customersDetails AS SELECT * FROM supermarket.customer ORDER BY CardID`;

    db.query(sql,(err,results)=>{
        if (err) throw err;
        console.log('Views created');
    });
}

module.exports.createViews = createViews;


