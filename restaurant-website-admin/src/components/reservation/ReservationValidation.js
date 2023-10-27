
class ReservationValidation {

  static validateEdit(reservation) {
    let error = "";
    if (isNaN(reservation.noOfPerson)) {
      error = 'Number of person should be number';
      return error;
    }
    return error;
  }

}

export default ReservationValidation;