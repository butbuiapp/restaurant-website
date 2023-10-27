const Menu = require('../services/menu');
const fs = require('fs');
const Constant = require('../helper/constant');

module.exports.getAllCategories = async (req, res, next) => {
  try {
    let categories = await Menu.getCatagories();
    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: categories });
  } catch (error) {
    next(error);
  }
}

module.exports.getAllDishes = async (req, res, next) => {
  try {
    let dishes = await Menu.getDishes();
    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: dishes });
  } catch (error) {
    next(error);
  }
}

module.exports.searchDish = async (req, res, next) => {
  try {
    let dishes = await Menu.searchDish(req.body);
    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: dishes });
  } catch (error) {
    next(error);
  }
}

module.exports.deleteDish = async (req, res, next) => {
  try {
    Menu.deleteDish(req.params.dishId);
    res.send({ [Constant.RESPONSE.SUCCESS]: true });
  } catch (error) {
    next(error);
  }
}

module.exports.addDish = async (req, res, next) => {
  try {
    console.log('req.body.dishId', req.body.dishId)
    // no image
    if (req.file == undefined) {
      // no file upload -> add/update database
      if (req.body.dishId === undefined || req.body.dishId === '') {
        // add new
        Menu.insertDish(req.body);
      } else {
        // update
        Menu.updateDish(req.body);
      }
    } else {
      // image upload
      const imageName = '/images/products/' + req.file.filename;

      if (req.body.dishId === undefined || req.body.dishId === '') {
        // add new dish
        Menu.insertDish(req.body, imageName);
      } else { // update dish
        if (req.body.dishImageURL !== '') {
          // delete old image
          fs.unlink('public' + req.body.dishImageURL, (err) => {
            if (err) throw err;
          });
        }
        // update database
        Menu.updateDish(req.body, imageName);
      }
    }
    return res.send({ [Constant.RESPONSE.SUCCESS]: true });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

module.exports.getDishByCatId = async (req, res, next) => {
  try {
    let dishes;
    if (req.params.id !== '0')
      dishes = await Menu.getDishByCategory(req.params.id);
    else
      dishes = await Menu.getDishes();

    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: dishes });
  } catch (error) {
    next(error);
  }
}

module.exports.getDishById = async (req, res, next) => {
  try {
    const dishId = req.params.id;
    const arrDish = await Menu.getDishById(dishId);
    const dish = arrDish[0];

    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: { dish } });
  } catch (error) {
    next(error);
  }
}

module.exports.getComments = async (req, res, next) => {
  try {
    const dishId = req.params.id;
    //get review
    const reviews = await Menu.getReviews(dishId);
    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: reviews });
  } catch (error) {
    next(error);
  }
}

module.exports.addComment = async (req, res, next) => {
  try {
    Menu.addComment(req.body);

    //get review
    let reviews = await Menu.getReviews(req.body.dishId);

    res.send({ [Constant.RESPONSE.SUCCESS]: true, data: reviews });
  } catch (error) {
    next(error);
  }
}
