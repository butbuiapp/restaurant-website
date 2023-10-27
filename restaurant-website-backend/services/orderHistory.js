const db = require('../dbConnector');

module.exports = class OrderHistory {

  constructor(ordId, prevStatus, currStatus, updDate) {
    this.ordId = ordId;
    this.prevStatus = prevStatus;
    this.currStatus = currStatus;
    this.updDate = updDate;
  }

  static getOrderHistory(ordId) {
    const query = 'SELECT * ' + 
                  'FROM order_history ' +
                  `WHERE ordId = ${ordId}`;
    return db.query(query);
  }

  static insertOrderHistory(oh) {
    const query = `INSERT INTO order_history SET ?`;
    db.query(query, oh);
  }
}