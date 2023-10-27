const Constant = require('../helper/constant');
const Order = require('../services/order');
const OrderHistory = require('../services/orderHistory');

module.exports.addOrder = async (req, res, next) => {
  try {
    const ordId = await Order.insertOrder(req.body);
    res.send({[Constant.RESPONSE.SUCCESS]: true, ordId});
  } catch (error) {
    next(error);
  }
}

module.exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.getOrders();
    res.send({[Constant.RESPONSE.SUCCESS]: true, data: orders});
  } catch (error) {
    next(error);
  }
}

module.exports.searchOrder = async (req, res, next) => {
  try {
    const orders = await Order.searchOrder(req.body);
    res.send({[Constant.RESPONSE.SUCCESS]: true, data: orders});
  } catch (error) {
    next(error);
  }
}

module.exports.getOrderDetail = async (req, res, next) => {
  try {
    const ordId = req.params.ordId;
    const orderDetails = await Order.getOrderDetail(ordId);
    res.send({[Constant.RESPONSE.SUCCESS]: true, orderDetails: orderDetails});
  } catch (error) {
    next(error);
  }
}

module.exports.getOrderHistory = async (req, res, next) => {
  try {
    const ordId = req.params.ordId;
    const orderHistory = await OrderHistory.getOrderHistory(ordId);
    res.send({[Constant.RESPONSE.SUCCESS]: true, orderHistory: orderHistory});
  } catch (error) {
    next(error);
  }
}

module.exports.updateOrder = (req, res, next) => {
  try {
    Order.updateOrder(req.body);
    res.send({[Constant.RESPONSE.SUCCESS]: true});
  } catch (error) {
    next(error);
  }
}