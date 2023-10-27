import DateTimeHelper from '../../helper/DateTimeHelper';
import { useRef } from 'react';
import Constant from '../../helper/Constant';
import OrderService from '../../services/OrderService';

function OrderInfo({ order, setError, reload }) {
  const statusRef = useRef();

  async function updateHandler() {    
    const newOrder = {...order, newStatus: statusRef.current.value};

    // call API
    const res = await OrderService.updateOrder(newOrder);
    if (res) {
      if (res.success) {
        reload({...order, status: statusRef.current.value});
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  return (
    <div className='cusInfo-container'>
      <div>
        <p className="cusInfo"><label>Order ID:</label>{order.ordId}</p>
        <p className="cusInfo"><label>Order  Status:</label>{order.status}</p>
        <p className="cusInfo"><label>Order Date:</label>{DateTimeHelper.formatSqlDateTime(order.ordDate)}</p>
        <p className="cusInfo"><label>Customer Name:</label>{order.ordName}</p>
        <p className="cusInfo"><label>Shipping Address:</label>{order.ordAddress}</p>
        <p className="cusInfo"><label>Phone:</label>{order.ordPhone}</p>
      </div>
      <div className='actions'>
        <select id="status" name='status' className='select' ref={statusRef}>
          <option value={Constant.ORDER_STATUS.NEW}>{Constant.ORDER_STATUS.NEW}</option>
          <option value={Constant.ORDER_STATUS.AWAITING_PAYMENT}>{Constant.ORDER_STATUS.AWAITING_PAYMENT}</option>
          <option value={Constant.ORDER_STATUS.CONFIRMED}>{Constant.ORDER_STATUS.CONFIRMED}</option>
          <option value={Constant.ORDER_STATUS.AWAITING_SHIPMENT}>{Constant.ORDER_STATUS.AWAITING_SHIPMENT}</option>
          <option value={Constant.ORDER_STATUS.SHIPPED}>{Constant.ORDER_STATUS.SHIPPED}</option>
          <option value={Constant.ORDER_STATUS.COMPLETED}>{Constant.ORDER_STATUS.COMPLETED}</option>
          <option value={Constant.ORDER_STATUS.CANCELED}>{Constant.ORDER_STATUS.CANCELED}</option>
          <option value={Constant.ORDER_STATUS.REFUNDED}>{Constant.ORDER_STATUS.REFUNDED}</option>
        </select>
        <button className='btn' onClick={updateHandler}>Update Status</button>
      </div>
    </div>
  )
}
export default OrderInfo;