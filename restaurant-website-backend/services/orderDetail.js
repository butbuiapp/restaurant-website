const db = require('../dbConnector');

module.exports = class OrderDetail {

  constructor(ordId, dishId, price, quantity) {
    this.ordId = ordId,
    this.dishId = dishId,
    this.price = price,
    this.quantity = quantity
  }

  static async insertOrderDetail(ordId, orderItems) {
    const query = 'INSERT INTO `order_detail` SET ?';
    for (let item of orderItems) {
      const orderDetail = new OrderDetail(ordId, 
                                    item.dishId, 
                                    item.price, 
                                    item.quantity);
      db.query(query, orderDetail);
    }
  }

  static async getOrderDetail(ordId) {
    const query = `SELECT * FROM order_detail od WHERE ordId=${ordId} `;
    return db.query(query);
  }

}