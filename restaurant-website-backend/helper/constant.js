class Constant {
    static RESERVATION_STATUS = {
        NEW: 'New',
        UPDATED: 'Updated',
        CANCELED: 'Cancelled',
        COMPLETED: 'Completed'
    }
    static ORDER_STATUS = {
      NEW: 'New',
      AWAITING_PAYMENT: 'Awaiting Payment',
      CONFIRMED: 'Confirmed',      
      AWAITING_SHIPMENT: 'Awaiting Shipment',
      SHIPPED: 'Shipped',
      CANCELED: 'Cancelled',
      COMPLETED: 'Completed',
      REFUNDED: 'Refunded'
  }
    static RESPONSE = {
      SUCCESS: "success",
      ERROR: "error"
    }
}

module.exports = Constant;
