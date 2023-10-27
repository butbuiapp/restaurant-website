import ReservationList from "../components/reservation/ReservationList";
import { useState, useEffect } from "react";
import ReservationService from "../services/ReservationService";
import DisplayMessage from "../components/displayMessage/DisplayMessage";

function ManageReservationPage() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedReservations, setLoadedReservations] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      const res = await ReservationService.getAllReservations();
      if (res) {
        if (res.success) {
          setLoadedReservations([...res.data]);
        } else {
          setError(res.error);
        }
      } else {
        setError('There is something wrong. Please try again.');
      }
      setIsLoading(false);
    }
    fetchData();

  }, []);

  if (isLoading) {
    return (
      <section><p>Loading...</p></section>
    );
  }

  return (
    <>
      <p className="page-title">Reservation</p>
      <div className="error_container">
        {error && <DisplayMessage message={error} type="error" />}
      </div>
      <ReservationList dataList={loadedReservations} />
    </>
  );
}

export default ManageReservationPage;