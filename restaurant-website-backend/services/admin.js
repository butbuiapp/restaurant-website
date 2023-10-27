const db = require('../dbConnector');
const bcrypt = require('bcrypt');

class Admin {
    static async login(username, password) {
        let query = `SELECT password FROM admin WHERE username='${username}'`;
        const response = await db.query(query);
        
        if (response.length!==0) {
            const hashPwd = response[0].password;
            return bcrypt.compareSync(password, hashPwd);
        }
        return false;
    }
}

module.exports = Admin;