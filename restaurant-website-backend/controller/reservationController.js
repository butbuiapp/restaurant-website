const Reservation = require('../services/reservation');
const Constant = require('../helper/constant');

module.exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.getAllReservations();
    res.send({[Constant.RESPONSE.SUCCESS]: true, data: reservations});
  } catch (error) {
    next(error);
  }
};

module.exports.updateReservation = (req, res, next) => {
  try {
    Reservation.updateReservation(req.body);
    res.send({[Constant.RESPONSE.SUCCESS]: true});
  } catch (error) {
    next(error);
  }
}

module.exports.cancelReservation = (req, res, next) => {
  try {
    Reservation.cancelReservation(req.params.id);
    res.send({[Constant.RESPONSE.SUCCESS]: true});
  } catch (error) {
    next(error);
  }
}

module.exports.search = async (req, res, next) => {
  try {
    const reservations = await Reservation.searchReservation(req.body);
    res.send({[Constant.RESPONSE.SUCCESS]: true, data: reservations});
  } catch (error) {
    next(error);
  }
}

module.exports.addReservation = (req, res, next) => {
  try {
    Reservation.addReservation(req.body);
    res.send({[Constant.RESPONSE.SUCCESS]: true});
  } catch (error) {
    next(error);
  }
}