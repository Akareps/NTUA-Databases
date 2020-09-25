function createforeignKeys (db) {
    // put Foreign Keys in tables
    let sql = 'ALTER TABLE `Supermarket`.`Product` ADD FOREIGN KEY (`Kind`) REFERENCES `Product_category`(`Kind`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Price_history` ADD FOREIGN KEY (`Barcode`) REFERENCES `Product`(`Barcode`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Customer` ADD FOREIGN KEY (`StoreID`) REFERENCES `Store`(`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Customer_transaction` ADD FOREIGN KEY (`CardID`) REFERENCES `Customer`(`CardID`) ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Customer_transaction` ADD FOREIGN KEY (`StoreID`) REFERENCES `Store`(`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Kinds_in_store` ADD FOREIGN KEY (`StoreID`) REFERENCES `Store`(`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Kinds_in_Store` ADD FOREIGN KEY (`Kind`) REFERENCES `Product_category`(`Kind`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Products_in_store` ADD FOREIGN KEY (`StoreID`) REFERENCES `Store`(`StoreID`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Products_in_store` ADD FOREIGN KEY (`Barcode`) REFERENCES `Product`(`Barcode`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Product_bought_by` ADD FOREIGN KEY (`Barcode`) REFERENCES `Product`(`Barcode`) ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Product_bought_by` ADD FOREIGN KEY (`CardID`) REFERENCES `Customer`(`CardID`) ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'ALTER TABLE `Supermarket`.`Product_bought_by` ADD FOREIGN KEY (`TransactionID`) REFERENCES `customer_transaction`(`TransactionID`) ON DELETE CASCADE ON UPDATE CASCADE;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
}

module.exports.createforeignKeys = createforeignKeys;