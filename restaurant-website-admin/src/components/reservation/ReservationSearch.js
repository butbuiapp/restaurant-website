import classes from './ReservationSearch.module.css';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Constant from '../../helper/Constant';
import DateTimeHelper from '../../helper/DateTimeHelper';

function ReservationSearch(props) {
  const [startDate, setStartDate] = useState();
  const cusNameRef = useRef();
  const statusRef = useRef();

  function searchHandler(event) {
    event.preventDefault();

    let resDate = '';
    if (startDate) {
      resDate = DateTimeHelper.formatDate(startDate, 'yyyy-MM-dd');
    }

    const conditions = {
      resDate: resDate,
      cusName: cusNameRef.current.value,
      status: statusRef.current.value
    }

    props.onSearch(conditions);
  }

  return <form onSubmit={searchHandler}>
    <div className={classes.reservation_search}>
      <div className={classes.control}>
        <label htmlFor='resDate'>Reservation Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          startDate={startDate}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='cusName'>Customer Name</label>
        <input type="text" required id='cusName' ref={cusNameRef} maxLength="45" />
      </div>
      <div className={classes.control}>
        <label htmlFor='status'>Status</label>
        <select id="status" name='status' className={classes.select} ref={statusRef}>
          <option value=''>All</option>
          <option value={Constant.RESERVATION_STATUS.NEW}>{Constant.RESERVATION_STATUS.NEW}</option>
          <option value={Constant.RESERVATION_STATUS.UPDATED}>{Constant.RESERVATION_STATUS.UPDATED}</option>
          <option value={Constant.RESERVATION_STATUS.CANCELED}>{Constant.RESERVATION_STATUS.CANCELED}</option>
          <option value={Constant.RESERVATION_STATUS.COMPLETED}>{Constant.RESERVATION_STATUS.COMPLETED}</option>
        </select>
      </div>
      <div className={classes.actions}>
        <button className='btn' onClick={searchHandler}>Search</button>
      </div>
    </div>
  </form>
}

export default ReservationSearch;