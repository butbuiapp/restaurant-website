const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');

// API
router.post('/', controller.login);

module.exports = router;