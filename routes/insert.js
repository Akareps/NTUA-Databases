const express = require('express');
const router = express.Router();

const customers_controller = require('../controllers/customers');
const sales_controller = require('../controllers/sales');
const customer_transactions_controller = require('../controllers/customer_transactions');
const products_controller = require('../controllers/products');
const products_in_store_controller = require('../controllers/products_in_store');

// GET ROUTERS
router.get('/customers',customers_controller.customers_create_get);
router.get('/sales',sales_controller.sales_create_get);
router.get('/customer_transactions',customer_transactions_controller.customer_transactions_create_get);
router.get('/products',products_controller.products_create_get);
router.get('/products_in_store',products_in_store_controller.products_in_store_create_get);

// POST ROUTERS
router.post('/customers',customers_controller.customers_create_post);
router.post('/sales',sales_controller.sales_create_post);
router.post('/customer_transactions',customer_transactions_controller.customer_transactions_create_post);
router.post('/products',products_controller.products_create_post);
router.post('/products_in_store',products_in_store_controller.products_in_store_create_post);

module.exports = router;