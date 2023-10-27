import classes from './EditReservation.module.css';
import Modal from '../../ui/modal/Modal';
import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, setHours, setMinutes } from 'date-fns';
import DateTimeHelper from '../../helper/DateTimeHelper';
import Constant from '../../helper/Constant';
import ReservationValidation from './ReservationValidation';
import ReservationService from '../../services/ReservationService';
import DisplayMessage from '../displayMessage/DisplayMessage';

function EditReservation(props) {
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState(DateTimeHelper.createJsDate(props.defaultValue.resDateTime));
  const [startTime, setStartTime] = useState(DateTimeHelper.createJsDate(props.defaultValue.resDateTime));

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const noOfPersonRef = useRef();
  const cusNameRef = useRef();
  const cusPhoneRef = useRef();
  const cusEmailRef = useRef();

  function saveHandler(event) {
    event.preventDefault();

    const enteredNoOfPerson = noOfPersonRef.current.value;
    const enteredCusName = cusNameRef.current.value;
    const enteredCusPhone = cusPhoneRef.current.value;
    const enteredCusEmail = cusEmailRef.current.value;

    // validation
    const result = ReservationValidation.validateEdit({ noOfPerson: enteredNoOfPerson });
    
    if (result === "") {
      const resDate = DateTimeHelper.formatDate(startDate, 'yyyy-MM-dd');
      const resTime = DateTimeHelper.formatDate(startTime, 'hh:mm:ss');
      const resDateTime = resDate + 'T' + resTime;

      const reservationData = {
        resId: props.defaultValue.resId,
        resDateTime: resDateTime,
        noOfPerson: enteredNoOfPerson,
        cusName: enteredCusName,
        cusPhone: enteredCusPhone,
        cusEmail: enteredCusEmail,
        status: Constant.RESERVATION_STATUS.UPDATED
      }
      // update DB
      saveReservation(reservationData);      
    } else {
      setError(result);
    }
  }

  async function saveReservation(reservation) {
    const res = await ReservationService.updateReservation({ ...reservation });
    if (res) {
      if (res.success) {
        // update list
        props.onSaveReservation(reservation);
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  function closeHandler(event) {
    event.preventDefault();
    props.onClose();
  }

  return <Modal>
    <p className='page-title'>Edit Reservation</p>
    <form onSubmit={saveHandler}>
      {error && <DisplayMessage message={error} type="error" />}
      <div className={classes.control}>
        <label htmlFor='resId'>ID</label>
        <input type="text" required id='resId' defaultValue={props.defaultValue.resId} disabled />
      </div>
      <div className={classes.control}>
        <label htmlFor='resDate'>Reservation Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
          maxDate={addMonths(new Date(), 1)}
          startDate={startDate}
        />
      </div>
      <div className={classes.control}>
        <label>Reservation Time</label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          filterTime={filterPassedTime}
          includeTimes={[
            setHours(setMinutes(new Date(), 0), 11),
            setHours(setMinutes(new Date(), 30), 11),
            setHours(setMinutes(new Date(), 0), 12),
            setHours(setMinutes(new Date(), 30), 12),
            setHours(setMinutes(new Date(), 0), 13),
            setHours(setMinutes(new Date(), 30), 13),
            setHours(setMinutes(new Date(), 0), 14),
            setHours(setMinutes(new Date(), 30), 14),
            setHours(setMinutes(new Date(), 0), 15),
            setHours(setMinutes(new Date(), 30), 15),
            setHours(setMinutes(new Date(), 0), 16),
            setHours(setMinutes(new Date(), 30), 16),
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 17),
            setHours(setMinutes(new Date(), 0), 18),
            setHours(setMinutes(new Date(), 30), 18),
            setHours(setMinutes(new Date(), 0), 19),
            setHours(setMinutes(new Date(), 30), 19)
          ]}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='noOfPerson'>Number of Person</label>
        <input type="text" required id='noOfPerson' ref={noOfPersonRef}
          defaultValue={props.defaultValue.noOfPerson} maxLength="2" />
      </div>
      <div className={classes.control}>
        <label htmlFor='cusName'>Customer Name</label>
        <input type="text" required id='cusName' ref={cusNameRef}
          defaultValue={props.defaultValue.cusName} maxLength="45" />
      </div>
      <div className={classes.control}>
        <label htmlFor='cusPhone'>Customer Phone</label>
        <input type="tel" required id='cusPhone' ref={cusPhoneRef}
          defaultValue={props.defaultValue.cusPhone} maxLength="15" />
      </div>
      <div className={classes.control}>
        <label htmlFor='cusEmail'>Customer Email</label>
        <input type="email" required id='cusEmail' ref={cusEmailRef}
          defaultValue={props.defaultValue.cusEmail} maxLength="45" />
      </div>
      <div className={classes.actions}>
        <button className='btn' onClick={saveHandler}>Save</button>
        <button className='btn btn--alt' onClick={closeHandler}>Cancel</button>
      </div>
    </form>
  </Modal>
}

export default EditReservation;