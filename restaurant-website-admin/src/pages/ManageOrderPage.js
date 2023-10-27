import { useState, useEffect } from "react";
import OrderList from "../components/order/OrderList";
import OrderService from "../services/OrderService";
import DisplayMessage from "../components/displayMessage/DisplayMessage";

function ManageOrdersPage() {
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchOrders() {
      const res = await OrderService.getOrders();
      if (res) {
        if (res.success) {
          setLoadedOrders([...res.data]);
        } else {
          setError(res.error);
        }
      } else {
        setError('There is something wrong. Please try again.');
      }
      setIsLoading(false);
    }
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <section><p>Loading...</p></section>
    );
  }
  
  return (
    <>
      <p className='page-title'>Order</p>
      <div className="error_container">
        {error && <DisplayMessage message={error} type="error" />}
      </div>
      <OrderList dataList={loadedOrders} setError={setError}/>
    </>
  )
}

export default ManageOrdersPage;