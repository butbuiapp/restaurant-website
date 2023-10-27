import DateTimeHelper from '../../helper/DateTimeHelper';
import { useNavigate } from "react-router-dom";

function OrderItem({ order }) {
  const navigate = useNavigate();

  function detailsHandler() {
    navigate('/order/detail', { state: order });
  }

  return (
    <>
      <tr>
        <td>{order.ordId}</td>
        <td>{DateTimeHelper.formatSqlDateTime(order.ordDate)}</td>
        <td>{order.ordName}</td>
        <td>{order.ordAddress}</td>
        <td>{order.ordPhone}</td>
        <td>{order.ordEmail}</td>
        <td>{order.totalPrice}</td>
        <td>{order.status}</td>
        <td>
          <button className='btn' onClick={detailsHandler} >Details</button>
        </td>
      </tr>
    </>
  )
}

export default OrderItem;