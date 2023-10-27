import { useState, useEffect } from 'react';
import DishList from '../components/menu/DishList';
import MenuService from '../services/MenuService';
import DisplayMessage from "../components/displayMessage/DisplayMessage";

function ManageDishPage() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedDishes, setLoadedDishes] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      const res = await MenuService.getAllDishes();
      if (res) {
        if (res.success) {
          setLoadedDishes([...res.data]);
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

  return <>
    <p className='page-title'>Dish</p>
    <div className="error_container">
      {error && <DisplayMessage message={error} type="error" />}
    </div>
    <DishList dataList={loadedDishes} setError={setError} />
  </>
}

export default ManageDishPage;