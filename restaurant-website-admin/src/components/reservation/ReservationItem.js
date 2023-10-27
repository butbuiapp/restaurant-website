import DateTimeHelper from '../../helper/DateTimeHelper';
import Constant from '../../helper/Constant';

function ReservationItem(props) {
    function editHandler() {
        props.onEditRow(props.reservation);
    }

    function cancelHandler() {
        props.onCancelRow(props.reservation.resId);
    }

    const isEditable = (props.reservation.status===Constant.RESERVATION_STATUS.NEW) ||
                       (props.reservation.status===Constant.RESERVATION_STATUS.UPDATED);

    return <tr>
        <td>{props.reservation.resId}</td>
        <td>{DateTimeHelper.formatSqlDateTime(props.reservation.resDateTime)}</td>
        <td>{props.reservation.noOfPerson}</td>
        <td>{props.reservation.cusName}</td>
        <td>{props.reservation.cusPhone}</td>
        <td>{props.reservation.cusEmail}</td>
        <td>{props.reservation.status}</td>
        <td>
            {isEditable ? (
                <div>
                    <button className='btn' onClick={editHandler} >Edit</button>
                    <button className='btn btn--alt' onClick={cancelHandler}>Cancel</button>
                </div>
            ) : ( 
                <div>
                    <button className='btn' disabled >Edit</button>
                    <button className='btn' disabled>Cancel</button>
                </div>
            )}
            
        </td>
    </tr>
}

export default ReservationItem;