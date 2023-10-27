import axios from 'axios';
import Constant from '../helper/Constant';

axios.defaults.baseURL = Constant.BACKEND_HOST;

function setToken() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { setToken };
