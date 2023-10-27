const express = require('express');
const router = express.Router();
const controller = require('../controller/menuController');
const upload = require('../helper/upload');
const { authenticate } = require('../helper/authUtils');

router.get('/categories', controller.getAllCategories);
router.get('/dishes', controller.getAllDishes);

// user side
router.get('/:id', controller.getDishByCatId);
router.get('/dish/:id', controller.getDishById);
router.get('/comments/:id', controller.getComments);
router.post('/comment/add', controller.addComment);

// admin side
router.use(authenticate);
router.put('/dish/search', controller.searchDish);
router.delete('/dish/:dishId', controller.deleteDish);
router.post('/upload', upload.single('image'), controller.addDish);
router.post('/dish/add', controller.addDish);

module.exports = router;