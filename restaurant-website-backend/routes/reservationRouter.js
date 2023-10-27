const express = require('express');
const router = express.Router();
const controller = require('../controller/reservationController');
const { authenticate } = require('../helper/authUtils');

// user side
router.post('/add', controller.addReservation);

// admin side
router.use(authenticate);
router.get('/getall', controller.getAllReservations);
router.put('/update', controller.updateReservation);
router.put('/cancel/:id', controller.cancelReservation);
router.put('/search', controller.search);

module.exports = router;