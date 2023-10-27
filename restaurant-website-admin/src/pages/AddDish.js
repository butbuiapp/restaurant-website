import './AddDish.css';
import { useRef, useState, useEffect } from 'react';
import MenuService from '../services/MenuService';
import DisplayMessage from '../components/displayMessage/DisplayMessage';
import { useNavigate, useLocation } from 'react-router-dom';
import DishValidation from '../components/menu/DishValidation';
import Constant from '../helper/Constant';

function AddDish() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [image, setImage] = useState();
  const [localFile, setLocalFile] = useState();
  const [catId, setCatId] = useState();

  const catIdRef = useRef();
  const dishNameRef = useRef();
  const descriptionRef = useRef();
  const ingredientsRef = useRef();
  const priceRef = useRef();
  const servingsRef = useRef();
  const preparationTimeRef = useRef();
  const cookingTimeRef = useRef();

  useEffect(() => {
    // set focus to dish name
    dishNameRef.current.focus();

    // get categories
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

    // edit mode
    if (location.state) {
      const dish = location.state;
      setCatId(dish.catId);
      dishNameRef.current.value = dish.dishName;
      descriptionRef.current.value = dish.description;
      ingredientsRef.current.value = dish.ingredients;
      priceRef.current.value = dish.price;
      servingsRef.current.value = dish.servings;
      preparationTimeRef.current.value = dish.preparationTime;
      cookingTimeRef.current.value = dish.cookingTime;
      setLocalFile(Constant.BACKEND_HOST + dish.dishImageURL);
    }
  }, [location.state]);

  function saveHandler(event) {
    event.preventDefault();

    const dish = {
      catId: catIdRef.current.value,
      dishId: location.state ? location.state.dishId : '',
      dishName: dishNameRef.current.value,
      ingredients: ingredientsRef.current.value,
      image: image,
      dishImageURL: location.state ? location.state.dishImageURL : '',
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      servings: servingsRef.current.value,
      preparationTime: preparationTimeRef.current.value,
      cookingTime: cookingTimeRef.current.value,
    }
   
    // validate
    const result = DishValidation.validateAddDish(dish);
    // if no error
    if (result === "") {
      // save to DB
      saveDish(dish);
    } else {
      setError(result);
    }
  }

  async function saveDish(dish) {
    // call API
    const res = await MenuService.addDish(dish);
    if (res) {
      if (res.success) {
        // go to dish list
        navigate('/dish');
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  function cancelHandler(event) {
    event.preventDefault();
    navigate('/dish')
  }

  function imageHandler(event) {
    setImage(event.target.files[0]);
    setLocalFile(URL.createObjectURL(event.target.files[0]));
  }

  function categoryChangeHandler(event) {
    setCatId(event.target.value);
  }

  return (
    <div className='add-dish'>
      <p className='page-title'>{location.state ? "Edit Dish" : "Add Dish"}</p>
      <div className="error_container">
        {error && <DisplayMessage message={error} type="error" />}
      </div>
      <form encType='multipart/form-data' className='form' onSubmit={saveHandler}>
        {location.state &&
          <div className='control'>
            <label htmlFor='dishId'>ID</label>
            <input type="text" required id='dishId' defaultValue={location.state.dishId} disabled />
          </div>
        }
        <div className='control'>
          <div>
            <label htmlFor='category'>Category</label>
            <select id="category" name='category' value={catId} onChange={categoryChangeHandler}
              className='select' ref={catIdRef}>
              {loadedCategories.map((cat) => {
                return <option value={cat.catId} key={cat.catId}>{cat.catName}</option>
              })}
            </select>
          </div>
          <div>
            <label htmlFor='dishName'>Dish Name</label>
            <input type="text" required name='dishName' ref={dishNameRef} maxLength="100" />
          </div>
        </div>
        <div className='control'>
          <div>
            <label htmlFor='description'>Description</label>
            <textarea rows='6' name='description' ref={descriptionRef}
              maxLength="500" required></textarea>
          </div>
          <div>
            <label htmlFor='ingredients'>Ingredients</label>
            <textarea rows='6' required id='ingredients' ref={ingredientsRef}
              maxLength="100">
            </textarea>
          </div>
        </div>
        <div className='control'>
          <div>
            <label htmlFor='image'>Image</label>
            <input type="file" required id='image' name='image' onChange={imageHandler} />
          </div>
          <div>
            <img src={localFile} className='image' alt='Dish' />
          </div>
        </div>
        <div className='control'>
          <div>
            <label htmlFor='price'>Price</label>
            <input type="text" required id='price' ref={priceRef} maxLength="6" />
          </div>
          <div>
            <label htmlFor='servings'>Servings</label>
            <input type="text" required id='servings' ref={servingsRef} maxLength="3" />
          </div>
        </div>

        <div className='control'>
          <div>
            <label htmlFor='preparationTime'>Prepration Time</label>
            <input type="text" required id='preparationTime' ref={preparationTimeRef}
              maxLength="3" />
          </div>
          <div>
            <label htmlFor='cookingTime'>Cooking Time</label>
            <input type="text" required id='cookingTime' ref={cookingTimeRef}
              maxLength="3" />
          </div>
        </div>
        <div className='actions'>
          <button className='btn' onClick={saveHandler}>Save</button>
          <button className='btn btn--alt' onClick={cancelHandler}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddDish;