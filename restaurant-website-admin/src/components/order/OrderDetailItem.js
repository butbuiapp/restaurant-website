import Constant from "../../helper/Constant";

function OrderDetailItem({ od }) {
  return (
    <tr>
      <td><img src={Constant.BACKEND_HOST + od.dishImageURL} alt="Dish" /></td>
      <td>{od.dishName}</td>
      <td>{od.price}</td>
      <td>{od.quantity}</td>
      <td>{od.price * od.quantity}</td>
    </tr>
  )
}

export default OrderDetailItem;