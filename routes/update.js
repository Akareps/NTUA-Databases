const express = require('express');
const router = express.Router();

const customers_controller = require('../controllers/customers');
const categories_controller = require('../controllers/customer_transactions');
const products_controller = require('../controllers/products');
const publishers_controller = require('../controllers/products_in_store');

// GET ROUTERS
router.get('/customers',customers_controller.customers_update_get);
router.get('/categories',categories_controller.categories_update_get);
router.get('/products',products_controller.products_update_get);
router.get('/publishers',publishers_controller.products_in_store_update_get);


// POST ROUTERS
router.post('/customers',customers_controller.customers_update_post);
router.post('/categories',categories_controller.categories_update_post);
router.post('/products',products_controller.products_update_post);
router.post('/publishers',publishers_controller.products_in_store_update_post);
module.exports = router;