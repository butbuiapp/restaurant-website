import { useState } from "react";
import OrderItem from "./OrderItem";
import './OrderList.css';
import OrderSearch from "./OrderSearch";
import OrderService from "../../services/OrderService";

function OrderList({dataList, setError}) {
  const [orders, setOrders] = useState(dataList);

  async function searchHandler(conditions) {
    let res = null;
    if (conditions.ordDate === '' && conditions.cusName === '' && conditions.status === '') {
      res = await OrderService.getOrders();
    } else {
      res = await OrderService.searchOrder(conditions);
    }
    if (res) {
      if (res.success) {
        setOrders([...res.data]);
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  return (
    <div className='order_list'>
      <OrderSearch onSearch={searchHandler} />
      <h3>Total: {orders.length}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th className="expand">Customer Address</th>
            <th>Customer Phone</th>
            <th>Customer Email</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            return <OrderItem
              key={order.ordId}
              order={order}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList;