import './OrderDetail.css';
import OrderDetailItem from './OrderDetailItem';
import OrderService from "../../services/OrderService";
import { useEffect, useState } from "react";

function OrderDetail({ ordId, setError }) {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    async function fetchOrderDetail(ordId) {
      const res = await OrderService.getOrderDetails(ordId);
      if (res) {
        if (res.success) {
          setOrderDetails(res.orderDetails);
        } else {
          setError(res.error);
        }
      } else {
        setError('There is something wrong. Please try again.');
      }
    }
    fetchOrderDetail(ordId);

  }, [])

  return (
    <div className='order_detail'>
      <h3>Number of items: {orderDetails.length}</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Dish</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(od => {
            return <OrderDetailItem
              key={od.odId}
              od={od}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetail;