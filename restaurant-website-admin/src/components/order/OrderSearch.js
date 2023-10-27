import './OrderSearch.css';
import Constant from '../../helper/Constant';
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import DateTimeHelper from '../../helper/DateTimeHelper';

function OrderSearch(props) {
  const [startDate, setStartDate] = useState();
  const cusNameRef = useRef();
  const statusRef = useRef();

  function searchHandler(e) {
    e.preventDefault();
    let ordDate = '';
    if (startDate) {
      ordDate = DateTimeHelper.formatDate(startDate, 'yyyy-MM-dd');
    }

    const conditions = {
      ordDate: ordDate,
      cusName: cusNameRef.current.value,
      status: statusRef.current.value
    }
    props.onSearch(conditions);
  }

  return (
    <form onSubmit={searchHandler}>
      <div className='search_box'>
        <div className='control'>
          <label htmlFor='resDate'>Order Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
            startDate={startDate}
          />
        </div>
        <div className='control'>
          <label htmlFor='cusName'>Customer Name</label>
          <input type="text" required id='cusName' ref={cusNameRef} maxLength="45" />
        </div>
        <div className='control'>
          <label htmlFor='status'>Status</label>
          <select id="status" name='status' className='select' ref={statusRef}>
            <option value=''>All</option>
            <option value={Constant.ORDER_STATUS.NEW}>{Constant.ORDER_STATUS.NEW}</option>
            <option value={Constant.ORDER_STATUS.AWAITING_PAYMENT}>{Constant.ORDER_STATUS.AWAITING_PAYMENT}</option>
            <option value={Constant.ORDER_STATUS.CONFIRMED}>{Constant.ORDER_STATUS.CONFIRMED}</option>
            <option value={Constant.ORDER_STATUS.AWAITING_SHIPMENT}>{Constant.ORDER_STATUS.AWAITING_SHIPMENT}</option>
            <option value={Constant.ORDER_STATUS.SHIPPED}>{Constant.ORDER_STATUS.SHIPPED}</option>
            <option value={Constant.ORDER_STATUS.COMPLETED}>{Constant.ORDER_STATUS.COMPLETED}</option>
            <option value={Constant.ORDER_STATUS.CANCELED}>{Constant.ORDER_STATUS.CANCELED}</option>
            <option value={Constant.ORDER_STATUS.REFUNDED}>{Constant.ORDER_STATUS.REFUNDED}</option>
          </select>
        </div>
        <div className='actions'>
          <button className='btn' onClick={searchHandler}>Search</button>
        </div>
      </div>
    </form>
  )
}

export default OrderSearch;