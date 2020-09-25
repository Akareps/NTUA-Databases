function createIndexes(db) {
    //Since key attributes have indexes by default, the following indexes should be created:

    //Frequent query, many distinct values
    let sql = `CREATE INDEX transactionDateAndCost ON supermarket.customer_transaction(Date, Totalcost)`;
    db.query(sql, (err, results) => {
        if (err) throw err;
    });

    //Frequent query, many distinct values
    sql = `CREATE INDEX customerBirthDate ON supermarket.customer(BirthDate)`;

    db.query(sql, (err, results) => {
        if (err) throw err;
    });

    //Only other table which will potentially have many distinct values and OldPrice is the only non-key attribute
    sql = `CREATE INDEX oldPrices ON supermarket.price_history(Oldprice)`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('Indexes created');
    });
}
    
module.exports.createIndexes = createIndexes;