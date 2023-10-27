import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DisplayMessage from "../components/displayMessage/DisplayMessage";
import './OrderDetailPage.css';
import OrderDetail from "../components/order/OrderDetail";
import OrderInfo from "../components/order/OrderInfo";
import OrderHistory from "../components/order/OrderHistory";
import OrderService from "../services/OrderService";

function OrderDetailPage() {
  const location = useLocation();
  const [order, setOrder] = useState(location.state);
  const [error, setError] = useState();
  const [orderHistory, setOrderHistory] = useState([]);

  async function fetchOrderHistory(ordId) {
    const res = await OrderService.getOrderHistory(ordId);
    if (res) {
      if (res.success) {
        setOrderHistory(res.orderHistory);
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  useEffect(() => {
    if (location.state) {
      fetchOrderHistory(location.state.ordId);
    }
  }, [location.state])

  function reloadHandler(ord) {
    setOrder(ord);
    fetchOrderHistory(ord.ordId);
  }

  return (
    <div className="order_detail">
      <p className='page-title'>Order Detail</p>
      <div className="error_container">
        {error && <DisplayMessage message={error} type="error" />}
      </div>

      <OrderInfo order={order} setError={setError} reload={reloadHandler} />
      <OrderDetail ordId={order.ordId} setError={setError} />
      <OrderHistory orderHistory={orderHistory} />
    </div>
  )
}

export default OrderDetailPage;