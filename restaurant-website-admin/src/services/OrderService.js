import axios from "axios";
import { setToken } from "../config/axios";

class OrderService {

  constructor() {
    setToken();
  }

  async getOrders() {
    try {
      const res = await axios.get("/order/get");
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async searchOrder(conditions) {
    try {
      const res = await axios.post("/order/search", conditions);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getOrderDetails(ordId) {
    try {
      const res = await axios.get(`/order/detail/${ordId}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async getOrderHistory(ordId) {
    try {
      const res = await axios.get(`/order/history/${ordId}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async updateOrder(order) {
    try {
      const res = await axios.put(`/order/update`, order);
      return res.data;
    } catch (error) {
      return null;
    }
  }

}

const orderService = new OrderService();
export default orderService;