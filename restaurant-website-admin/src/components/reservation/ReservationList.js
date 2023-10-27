import classes from './ReservationList.module.css';
import ReservationItem from './ReservationItem';
import EditReservation from './EditReservation';
import ConfirmDialog from '../../ui/modal/ConfirmDialog';
import { useState } from 'react';
import Constant from '../../helper/Constant';
import ReservationService from '../../services/ReservationService';
import ReservationSearch from './ReservationSearch';

function ReservationList({ dataList, setError }) {
  // Confirm Dialog
  const [modelIsOpen, setModelIsOpen] = useState(false);
  // reservation list
  const [reservationList, setReservationList] = useState(dataList);
  // EditReservationPage
  const [editReservationIsOpen, setEditReservationIsOpen] = useState(false);
  // 1 row data
  const [rowToEdit, setRowToEdit] = useState(null);
  // store resId
  const [resId, setResId] = useState(null);

  function editRowHandler(reservation) {
    setEditReservationIsOpen(true);
    setRowToEdit(reservation);
  }

  function cancelRowHandler(resId) {
    setResId(resId);
    setModelIsOpen(true);
  }

  function closeEditReservation() {
    setEditReservationIsOpen(false);
  }

  async function saveReservation(reservationData) {
    // update list
    setReservationList(
      reservationList.map(currRes => {
        // update reservation if it is edited
        if (currRes.resId === reservationData.resId) {
          return reservationData;
        } else {
          return currRes;
        }
      })
    );
    // close edit modal
    setEditReservationIsOpen(false);
  }

  function closeConfirmDialog() {
    setModelIsOpen(false);
  }

  async function cancelReservation() {
    const res = await ReservationService.cancelReservation(resId);
    if (res) {
      if (res.success) {
        // update list
        setReservationList(
          reservationList.map(currRes => {
            // update reservation if it is edited
            if (currRes.resId === resId) {
              currRes.status = Constant.RESERVATION_STATUS.CANCELED;
              return currRes;
            } else {
              return currRes;
            }
          })
        );
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
    setModelIsOpen(false);
  }

  async function searchReservationHandler(conditions) {
    let res = null;
    if (conditions.resDate === '' && conditions.cusName === '' && conditions.status === '') {
      res = await ReservationService.getAllReservations();
    } else {
      res = await ReservationService.searchReservation(conditions);
    }
    if (res) {
      if (res.success) {
        setReservationList([...res.data]);
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  return (
    <div className={classes.table_wrapper}>
      <ReservationSearch onSearch={searchReservationHandler} />
      <h3>Total: {reservationList.length}</h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reservation Date Time</th>
            <th>Number of Person</th>
            <th className={classes.expand}>Customer Name</th>
            <th>Customer Phone</th>
            <th>Customer Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationList.map(reservation => {
            return <ReservationItem
              key={reservation.resId}
              reservation={reservation}
              onEditRow={editRowHandler}
              onCancelRow={cancelRowHandler}
            />
          })}
        </tbody>
      </table>
      {editReservationIsOpen
        ? <EditReservation
          onClose={closeEditReservation}
          onSaveReservation={saveReservation}
          defaultValue={rowToEdit}
        />
        : null
      }
      {
        modelIsOpen
          ? <ConfirmDialog
            message='Are you sure to cancel this reservation?'
            onCancel={closeConfirmDialog}
            onConfirm={cancelReservation}
          />
          : null
      }
    </div>
  );
}

export default ReservationList;