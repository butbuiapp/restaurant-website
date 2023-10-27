import { useState, useRef, useEffect } from 'react';
import classes from './DishSearch.module.css';
import MenuService from '../../services/MenuService';
import { useNavigate } from 'react-router-dom';

function DishSearch({ onSearch, setError}) {
  const categoryRef = useRef();
  const [loadedCategories, setLoadedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategory() {
      const res = await MenuService.getAllCategories();
      if (res) {
        if (res.success) {
          setLoadedCategories([...res.data]);
        } else {
          setError(res.error);
        }
      } else {
        setError('There is something wrong. Please try again.');
      }
    }
    fetchCategory();

  }, []);

  function searchHandler(event) {
    event.preventDefault();
    const conditions = {
      catId: categoryRef.current.value
    }
    onSearch(conditions);
  }

  function addDishHandler(event) {
    event.preventDefault();
    navigate('/dish/add');
  }

  return (
    <form onSubmit={searchHandler}>
      <div className={classes.dish_search}>
        <div className={classes.control}>
          <label htmlFor='category'>Category</label>
          <select id="category" name='category' className={classes.select} ref={categoryRef}>
            <option value=''>All</option>
            {loadedCategories.map((cat) => {
              return <option value={cat.catId} key={cat.catId}>{cat.catName}</option>
            })}
          </select>
        </div>
        <div className={classes.actions}>
          <button className='btn' onClick={searchHandler}>Search</button>
          <button className='btn' onClick={addDishHandler}>Add Dish</button>
        </div>
      </div>
    </form>
  )
}

export default DishSearch;