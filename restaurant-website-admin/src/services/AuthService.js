import axios from 'axios';

class AuthService {

  async login(username, password) {
    try {
      const res = await axios.post('/login', {username, password});
      return res.data;
    } catch (error) {
      return null;
    }
  }

  logout() {
    localStorage.clear();
  }

  getCurrentUser() {
    return localStorage.getItem('username');
  }

}

const authService = new AuthService();
export default authService;