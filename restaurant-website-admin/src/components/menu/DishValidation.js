
class DishValidation {

  static validateAddDish(dish) {
    let error = "";
    if (dish.category === "" ||
        dish.dishName === "" ||
        dish.description === "") {
      error = 'Please input required fields';
      return error;
    }
    if (!this.isNumber(dish.price)) {
      error = 'Price should be number';
      return error;
    }
    if (dish.servings !== '') {
      if (!this.isNumber(dish.servings)) {
        error = 'Servings should be number';
        return error;
      }
    }
    if (dish.preparationTime !== '') {
      if (!this.isNumber(dish.preparationTime)) {
        error = 'Preparation time should be number';
        return error;
      }
    }
    if (dish.cookingTime !== '') {
      if (!this.isNumber(dish.cookingTime)) {
        error = 'Cooking time should be number';
        return error;
      }
    }
    return error;
  }

  static isNumber(value) {
    const pattern = /^\d+([.]\d+)?$/;
    return pattern.test(value);
  }

}

export default DishValidation;