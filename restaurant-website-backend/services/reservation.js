const db = require('../dbConnector');
const Constant = require('../helper/constant');

class Reservation {
  constructor(resDateTime, noOfPerson, cusName, cusEmail, cusPhone, status) {
    this.resDateTime = resDateTime;
    this.noOfPerson = noOfPerson;
    this.cusName = cusName;
    this.cusEmail = cusEmail;
    this.cusPhone = cusPhone;
    this.status = status;
  }

  static addReservation(reservation) {
    const newRes = new Reservation(
      reservation.resDateTime,
      reservation.noOfPerson,
      reservation.cusName,
      reservation.cusEmail,
      reservation.cusPhone,
      Constant.RESERVATION_STATUS.NEW
    );

    const query = 'INSERT INTO reservation SET ? ';
    db.query(query, newRes)
  }

  static getAllReservations() {
    let query = 'SELECT resId, resDateTime, noOfPerson, cusName, cusPhone, cusEmail, ' +
      'IF((STRCMP(status,"New")=0 OR STRCMP(status,"Updated")=0) ' +
      'AND (resDateTime < now()), "Completed", status) status ' +
      'FROM reservation ' +
      'WHERE resDateTime >= DATE_SUB(NOW(), INTERVAL 1 MONTH) ' +
      'ORDER BY resDateTime desc';
    return db.query(query);
  }

  static updateReservation(reservation) {
    let query = `UPDATE reservation SET ` +
      `resDateTime='${reservation.resDateTime}', ` +
      `noOfPerson='${reservation.noOfPerson}', ` +
      `cusName='${reservation.cusName}', ` +
      `cusPhone='${reservation.cusPhone}', ` +
      `cusEmail='${reservation.cusEmail}', ` +
      `status='${reservation.status}' ` +
      `WHERE resId='${reservation.resId}'`
      ;
    db.query(query);
  }

  static cancelReservation(resId) {
    let query = `UPDATE reservation SET ` +
      `status='${Constant.RESERVATION_STATUS.CANCELED}' ` +
      `WHERE resId='${resId}'`
      ;
    db.query(query);
  }

  static searchReservation(conditions) {
    let query = `SELECT * FROM (` +
      `SELECT resId, resDateTime, noOfPerson, cusName, cusPhone, cusEmail, ` +
      `IF((STRCMP(status,"New")=0 OR STRCMP(status,"Updated")=0) ` +
      `AND (resDateTime < now()), "Completed", status) status ` +
      `FROM reservation ` +
      `WHERE 1=1 `;
    if (conditions.resDate) {
      query += `AND DATE(resDateTime) = '${conditions.resDate}' `;
    }
    if (conditions.cusName) {
      query += `AND cusName LIKE '%${conditions.cusName}%' `;
    }
    query += `) R `;
    if (conditions.status) {
      query += `WHERE status = '${conditions.status}' `;
    }
    query += `ORDER BY resDateTime desc`;
    return db.query(query);
  }
}

module.exports = Reservation;