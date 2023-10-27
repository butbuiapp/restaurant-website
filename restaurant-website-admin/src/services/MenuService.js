import axios from 'axios';
import { setToken } from "../config/axios";

class MenuService {

  constructor() {
    setToken();
  }

  async getAllDishes() {
    try {
      const res = await axios.get('/menu/dishes');
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getAllCategories() {
    try {
      const res = await axios.get('/menu/categories');
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async searchDish(conditions) {
    try {
      const res = await axios.put('/menu/dish/search', conditions);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async deleteDish(dishId) {
    try {
      const res = await axios.delete(`/menu/dish/${dishId}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async addDish(dish) {
    const formData = new FormData();
    for (const name in dish) {
      formData.append(name, dish[name]);
    }
    let res = null;
    if (dish.image) {
      // upload image
      res = await axios.post('/menu/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
    } else {
      res = await axios.post('/menu/dish/add', dish);
    }
    return res.data;
  }

}

const menuService = new MenuService();
export default menuService;