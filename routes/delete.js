const express = require('express');
const router = express.Router();

const customers_controller = require('../controllers/customers');
const categories_controller = require('../controllers/customer_transactions');
const products_controller = require('../controllers/products');
const products_in_store_controller = require('../controllers/products_in_store')

// GET ROUTERS
router.get('/products_in_store', products_in_store_controller.products_in_store_delete_get)
router.get('/customers',customers_controller.customers_delete_get);
router.get('/categories',categories_controller.categories_delete_get);
router.get('/products',products_controller.products_delete_get);

// POST ROUTERS
router.post('/products_in_store',products_in_store_controller.products_in_store_delete_post);
router.post('/customers',customers_controller.customers_delete_post);
router.post('/categories',categories_controller.categories_delete_post);
router.post('/products',products_controller.products_delete_post);

module.exports = router;