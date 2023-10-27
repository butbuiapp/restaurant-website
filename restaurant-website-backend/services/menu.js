const db = require('../dbConnector');

module.exports = class Menu {

  static getCatagories() {
    let query = 'SELECT * FROM category';
    return db.query(query);
  }

  static getDishById(dishId) {
    const query = "SELECT * FROM dish WHERE dishId =  " + dishId;
    return db.query(query);
  }

  static getDishes() {
    const query = "SELECT * FROM dish ";
    return db.query(query);
  }

  static getDishByCategory(catId) {
    const query = "SELECT * FROM dish WHERE catId= " + catId;
    return db.query(query);
  }

  static addComment(cmt) {
    let query = `INSERT INTO review(dishId, revName, revDetail) ` + 
                `VALUES('${cmt.dishId}', ` +
                `'${cmt.name}', ` +
                `'${cmt.comment}')`
    db.query(query);
  }

  static getReviews(dishId) {
    let query = 'SELECT * FROM review WHERE dishId=' + dishId;
    return db.query(query);
  }

  static searchDish(conditions) {
    let query = `SELECT * FROM dish`;
    if (conditions.catId !== '') {
      query += ` WHERE catId=${conditions.catId}`;
    }
    return db.query(query);
  }

  static deleteDish(dishId) {
    const query = `DELETE FROM dish WHERE dishId=${dishId}`;
    return db.query(query);
  }

  static updateDish(dish, imageName) {
    console.log('updateDish===', dish);
    let query = `UPDATE dish SET ` +
      `dishName='${dish.dishName}', ` +
      `description='${dish.description}', ` +
      `ingredients='${dish.ingredients}', ` +
      `price=${dish.price}, ` +
      `catId=${dish.catId}, ` +
      `preparationTime=${dish.preparationTime === '' ? null : dish.preparationTime}, ` +
      `cookingTime=${dish.cookingTime === '' ? null : dish.cookingTime}, ` +
      `servings=${dish.servings === '' ? null : dish.servings} `;
    if (imageName) {
      query += `, dishImageURL='${imageName}' `;
    }
    query += `WHERE dishId=${dish.dishId}`;
    db.query(query);
  }

  static insertDish(dish, imageName) {
    let query = `INSERT INTO dish (dishName, description, ingredients, price, ` +
      `catId, dishImageURL, preparationTime, cookingTime, servings) ` +
      `VALUES ('${dish.dishName}', ` +
      `'${dish.description}', ` +
      `'${dish.ingredients}', ` +
      `${dish.price}, ` +
      `${dish.catId}, ` +
      `'${imageName === undefined ? '' : imageName}', ` +
      `${dish.preparationTime === '' ? null : dish.preparationTime}, ` +
      `${dish.cookingTime === '' ? null : dish.cookingTime}, ` +
      `${dish.servings === '' ? null : dish.servings}) `;
    db.query(query);
  }

}