import DateTimeHelper from '../../helper/DateTimeHelper';

function OrderHistoryItem({ oh }) {
  return (
    <tr>
      <td>{oh.prevStatus}</td>
      <td>{oh.currStatus}</td>
      <td>{DateTimeHelper.formatSqlDateTime(oh.updDate)}</td>
    </tr>
  )
}

export default OrderHistoryItem;