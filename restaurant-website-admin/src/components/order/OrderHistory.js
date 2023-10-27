import './OrderHistory.css';
import OrderHistoryItem from './OrderHistoryItem';

function OrderHistory({ orderHistory }) {

  return (
    <div className='order_history'>
      <p className='title'>Order History</p>
      <table className='table'>
        <thead>
          <tr>
            <th>Previous Status</th>
            <th>Current Status</th>
            <th>Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map(item => {
            return <OrderHistoryItem
              key={item.ohId}
              oh={item}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderHistory;