class Constant {
  static BACKEND_HOST = 'http://localhost:3001/';

  static RESERVATION_STATUS = {
    NEW: 'New',
    UPDATED: 'Updated',
    CANCELED: 'Canceled',
    COMPLETED: 'Completed'
  }

  static ORDER_STATUS = {
    NEW: 'New',
    AWAITING_PAYMENT: 'Awaiting Payment',
    CONFIRMED: 'Confirmed',
    AWAITING_SHIPMENT: 'Awaiting Shipment',
    SHIPPED: 'Shipped',
    COMPLETED: 'Completed',
    CANCELED: 'Canceled',
    REFUNDED: 'Refunded'
  }

}
export default Constant;
