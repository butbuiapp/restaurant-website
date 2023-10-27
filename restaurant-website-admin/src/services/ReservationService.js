import axios from "axios";
import { setToken } from "../config/axios";

class ReservationService {
  
  constructor() {
    setToken();
  }

  async getAllReservations() {
    try {      
      const res = await axios.get('/reservation/getall');
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async updateReservation(reservation) {
    try {
      const res = await axios.put('/reservation/update', reservation);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async cancelReservation(resId) {
    try {
      const res = await axios.put(`/reservation/cancel/${resId}`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async searchReservation(conditions) {
    try {
      const res = await axios.put(`/reservation/search`, conditions);
      return res.data;
    } catch (error) {
      return null;
    }
  }
  
}
const reservationService = new ReservationService();
export default reservationService;