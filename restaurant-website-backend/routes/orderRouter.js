const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');
const { authenticate } = require('../helper/authUtils');

// user side
router.post('/add', controller.addOrder);

// admin side
router.use(authenticate);
router.get('/get', controller.getOrders);
router.post('/search', controller.searchOrder);
router.get('/detail/:ordId', controller.getOrderDetail);
router.get('/history/:ordId', controller.getOrderHistory);
router.put('/update', controller.updateOrder);

module.exports = router;