const db = require('../dbConnector');
const OrderDetail = require("./orderDetail");
const DateTimeHelper = require('../helper/dateTimeHelper');
const Constant = require('../helper/constant');
const OrderHistory = require('./orderHistory');

class Order {
  constructor(ordName, ordDate, ordAddress, ordPhone, ordEmail, totalPrice, status) {
    this.ordName = ordName;
    this.ordDate = ordDate;
    this.ordAddress = ordAddress;
    this.ordPhone = ordPhone;
    this.ordEmail = ordEmail;
    this.totalPrice = totalPrice;
    this.status = status;
  }

  static async insertOrder(order) {
    let ordId = null;
    try {
      // open transaction
      db.connection.beginTransaction();

      let totalPrice = 0;
      for (let item of order.items) {
        totalPrice += item.total;
      }
      const newOrder = new Order(order.ordName,
        DateTimeHelper.formatDate(new Date()),
        order.ordAddress,
        order.ordPhone,
        order.ordEmail,
        totalPrice,
        Constant.ORDER_STATUS.NEW);

      // insert into order table
      const query = 'INSERT INTO `order` SET ? ';
      const res = await db.query(query, newOrder);
      ordId = res.insertId;

      // insert into order_datail table
      OrderDetail.insertOrderDetail(ordId, order.items);

      db.connection.commit();
    } catch (error) {
      db.connection.rollback();
      ordId = null;
    } finally {
      return ordId;
    }

  }

  static getOrders() {
    const query = 'SELECT * FROM `order` ' +
      `WHERE status='${Constant.ORDER_STATUS.NEW}' ORDER BY ordDate desc`;
    return db.query(query);
  }

  static getOrderById(ordId) {
    const query = 'SELECT * FROM `order` ' +
      `WHERE ordId=${ordId}`;
    return db.query(query);
  }

  static searchOrder(conditions) {
    let query = 'SELECT * FROM `order` WHERE 1=1 ';
    if (conditions.ordDate) {
      query += `AND DATE(ordDate) = '${conditions.ordDate}' `;
    }
    if (conditions.cusName) {
      query += `AND ordName LIKE '%${conditions.cusName}%'`
    }
    if (conditions.status) {
      query += `AND status = '${conditions.status}'`
    }
    return db.query(query);
  }

  static getOrderDetail(ordId) {
    const query = 'SELECT od.odId, od.price, od.quantity, d.dishName, d.dishImageURL ' +
      'FROM order_detail od, dish d ' +
      `WHERE od.ordId = ${ordId} AND od.dishId = d.dishId`;
    return db.query(query);
  }

  static updateOrder(order) {
    try {
      db.connection.beginTransaction();
      // update order status
      const query = 'UPDATE `order` ' +
        `SET status = '${order.newStatus}' ` +
        `WHERE ordId = ${order.ordId}`;
      db.query(query);

      // insert into order history
      const orderHistory = new OrderHistory(order.ordId,
        order.status,
        order.newStatus,
        DateTimeHelper.formatDate(new Date()));

      OrderHistory.insertOrderHistory(orderHistory);

      db.connection.commit();
    } catch (error) {
      db.connection.rollback();
    }

  }

};

module.exports = Order;