function createDatabase(db) {

    //initializes
    let sql = 'DROP DATABASE IF EXISTS Supermarket';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });
    sql = 'CREATE DATABASE Supermarket';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Store
    sql = 'CREATE TABLE `Supermarket`.`Store` ( `StoreID` INT NOT NULL AUTO_INCREMENT, `Workinghours` VARCHAR(50) NOT NULL,'+
        '`Squaremeters` INT NOT NULL , `Streetname` VARCHAR(50) NOT NULL, `Streetnumber` INT NOT NULL, `postalCode` INT  '+
        ' NOT NULL, `City` VARCHAR(40) NOT NULL, PRIMARY KEY (`StoreID`)) ENGINE = InnoDB';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Product_category
    sql = 'CREATE TABLE `Supermarket`.`Product_category` ( `Kind` VARCHAR(50) NOT NULL, `Numofproducts` INT NOT NULL,' +
        ' PRIMARY KEY (`Kind`)) ENGINE = InnoDB;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Product
    sql = 'CREATE TABLE `Supermarket`.`Product` ( `Barcode` INT NOT NULL, `Productname` VARCHAR(50) NOT NULL, ' +
        '`Currentprice` DOUBLE NOT NULL, `Kind` VARCHAR(50) NOT NULL, PRIMARY KEY (`Barcode`)) ENGINE = InnoDB';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Price_history
    sql = 'CREATE TABLE `Supermarket`.`Price_history` ( `Endingdate` VARCHAR(10) NOT NULL, `Oldprice` DOUBLE NOT NULL ' +
        ', `Barcode` INT NOT NULL, PRIMARY KEY (`Endingdate`, `Barcode`)) ENGINE = InnoDB';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Customer
    sql = 'CREATE TABLE `Supermarket`.`Customer` ( `CardID`  INT NOT NULL  AUTO_INCREMENT, `Bonuspoints` INT NOT NULL, `Numberofchildren` INT NOT NULL,'+
        ' `Fullname` VARCHAR(80) NOT NULL, `Maritalstatus` VARCHAR(20) NOT NULL, `StoreID` INT NOT NULL, `BirthDate` VARCHAR(10) NOT NULL,  PRIMARY KEY (`CardID`)) ENGINE = InnoDB;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Customer_transaction
    sql = 'CREATE TABLE `Supermarket`.`Customer_transaction` ( `TransactionID` INT NOT NULL  AUTO_INCREMENT, `Totalcost` DOUBLE NOT NULL, '+
        '`Time` Varchar(20) NOT NULL, `Date` Varchar(10) NOT NULL, `Methodofpayment` Varchar(20) NOT NULL, ' +
        '`Numofproducts` INT NOT NULL, `CardID` INT, `StoreID` INT NOT NULL, PRIMARY KEY (`TransactionID`)) ENGINE = InnoDB;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Kinds_in_store
    sql = 'CREATE TABLE `Supermarket`.`Kinds_in_store` ( `StoreID` INT NOT NULL, `Kind` VARCHAR(50) NOT NULL, '+
        'PRIMARY KEY (`StoreID`, `Kind`)) ENGINE = InnoDB;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Products_in_store
    sql = 'CREATE TABLE `Supermarket`.`Products_in_store` ( `StoreID` INT NOT NULL, `Barcode` INT NOT NULL, '+
        '`Label` BOOL NOT NULL, `Aisle` INT NOT NULL, `Shelf` INT NOT NULL, PRIMARY KEY (`StoreID`, `Barcode`)) ENGINE = InnoDB;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

    // table Product_bought_by
    sql = 'CREATE TABLE `Supermarket`.`Product_bought_by` ( `TransactionID` INT NOT NULL, `Barcode` INT NOT NULL, '+
        '`CardID` INT, `Amount` INT NOT NULL, PRIMARY KEY (`Barcode`, `TransactionID`)) ENGINE = InnoDB;';
    db.query(sql,(err,results)=>{
        if (err) throw err;
    });

}

module.exports.createDatabase = createDatabase;