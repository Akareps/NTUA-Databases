//Tools
const express = require('express');
const router = express.Router();



//Consts

const pricesHistoryController = require("../controllers/pricesHistory");
const agePercentageController = require("../controllers/agePercentages");
const spendingHoursController = require('../controllers/spendingHours');
const productLabelsController = require('../controllers/productLabels');
const productPlacementsController = require('../controllers/productPlacements');
const customers_controller = require('../controllers/customers');
const sales_controller = require('../controllers/sales');
const customer_transactions_controller = require('../controllers/customer_transactions');
const employees_controller = require('../controllers/products');
const publishers_controller = require('../controllers/products_in_store');
const productCouples = require('../controllers/productCouples');

//Router
router.get('/pricesHistory',pricesHistoryController.priceHistoryGet);
router.get('/agePercentages',agePercentageController.agePercentagesGet);
router.get('/spendingHours',spendingHoursController.spendingHoursGet);
router.get('/ProductLabels',productLabelsController.productLabelsTrustedGet);
router.get('/productPlacements',productPlacementsController.productPlacementsGet);
router.get('/customersRegisteredInStores',customers_controller.customersRegisteredInEachStore);
router.get('/customers',customers_controller.customers_advanced_get);
router.get('/customersDetails',customers_controller.customersDetails);
router.get('/sales',sales_controller.sales_create_get);
router.get('/salesPerCategory',sales_controller.salesPerCategoryList);
router.get('/categories',customer_transactions_controller.customer_transactions_list);
router.get('/busyHours',customer_transactions_controller.busyHours);
router.get('/employees',employees_controller.products_list);
router.get('/publishers',publishers_controller.products_in_store_list);
router.get('/productCouples',productCouples.productCouples);

router.post('/sales',sales_controller.sales_create_post);
router.post('/customers',customers_controller.customers_advanced_post);
router.post('/productPlacements',productPlacementsController.productPlacementsPost);
router.post('/priceHistory',pricesHistoryController.pricesHistoryList);

module.exports = router;