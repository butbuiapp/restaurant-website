import classes from './DishList.module.css';
import DishSearch from './DishSearch';
import DishItem from './DishItem';
import { useState } from 'react';
import MenuService from '../../services/MenuService';
import ConfirmDialog from '../../ui/modal/ConfirmDialog';

function DishList({ dataList, setError }) {
  // dish list
  const [dishList, setDishList] = useState(dataList);
  // Confirm dialog
  const [modelIsOpen, setModelIsOpen] = useState(false);
  // store dishId
  const [dishId, setDishId] = useState(null);

  function deleteRowHandler(dishId) {
    setDishId(dishId);
    setModelIsOpen(true);
  }

  async function searchHandler(conditions) {
    setError('');
    const res = await MenuService.searchDish(conditions);
    if (res) {
      if (res.success) {
        setDishList([...res.data]);
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  function closeConfirmDialog() {
    setModelIsOpen(false);
  }

  async function deleteDish() {
    // call API
    const res = await MenuService.deleteDish(dishId)
    if (res) {
      if (res.success) {
        setDishList(
          dishList.filter(dish => dish.dishId !== dishId)
        );
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
    setModelIsOpen(false);
  }

  return (
    <div className={classes.table_wrapper}>
      <DishSearch onSearch={searchHandler} setError={setError} />
      <h3>Total: {dishList.length}</h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Dish ID</th>
            <th>Dish Name</th>
            <th>Price</th>
            <th className={classes.expand}>Ingredients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishList.map((dish) => {
            return <DishItem
              key={dish.dishId}
              dish={dish}
              onDeleteRow={deleteRowHandler}
            />
          })}
        </tbody>
      </table>
      {modelIsOpen && <ConfirmDialog
        message='Are you sure to delete the dish?'
        onCancel={closeConfirmDialog}
        onConfirm={deleteDish}
      />}

    </div>
  )
}

export default DishList;
