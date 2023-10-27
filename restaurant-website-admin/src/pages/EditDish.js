import classes from './AddDish.module.css';
import { useRef, useState, useEffect } from 'react';
import MenuService from '../services/MenuService';
import Config from '../config';
import DisplayMessage from '../components/displayMessage/DisplayMessage';

function AddDish(props) {
  const [error, setError] = useState();
  const [loadedCategories, setLoadedCategories] = useState([]);
  const [image, setImage] = useState();
  const [localFile, setLocalFile] = useState(Config.API.GetDishImage + props.defaultValue.dishImageURL);
  const [catId, setCatId] = useState(props.defaultValue.catId);

  const dishNameRef = useRef();
  const descriptionRef = useRef();
  const ingredientsRef = useRef();
  const priceRef = useRef();
  const servingsRef = useRef();
  const preparationTimeRef = useRef();
  const cookingTimeRef = useRef();

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

  function saveHandler(event) {
    event.preventDefault();
    const dish = {
      catId: catId,
      dishId: props.defaultValue.dishId,
      dishName: dishNameRef.current.value,
      ingredients: ingredientsRef.current.value,
      image: image,
      dishImageURL: props.defaultValue.dishImageURL,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      servings: servingsRef.current.value,
      preparationTime: preparationTimeRef.current.value,
      cookingTime: cookingTimeRef.current.value,
    }
    props.onSave(dish);
  }

  function cancelHandler(event) {
    event.preventDefault();
    props.onCancel();
  }

  let title = 'Add Dish';
  if (props.defaultValue.dishId) {
    title = 'Edit Dish';
  }

  function imageHandler(event) {
    setImage(event.target.files[0]);
    setLocalFile(URL.createObjectURL(event.target.files[0]));
  }

  function categoryChangeHandler(event) {
    setCatId(event.target.value);
  }

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <p className='page-title'>{title}</p>
        <div className="error_container">
          {error && <DisplayMessage message={error} type="error" />}
        </div>
        <form encType='multipart/form-data' className='classes.form' onSubmit={saveHandler}>
          {props.defaultValue.dishId && <div className={classes.control}>
            <label htmlFor='dishId'>ID</label>
            <input type="text" required id='dishId' defaultValue={props.defaultValue.dishId} disabled />
          </div>}
          <div className={classes.control}>
            <div>
              <label htmlFor='category'>Category</label>
              <select id="category" name='category' value={catId} onChange={categoryChangeHandler}
                className={classes.select} >
                {loadedCategories.map((cat) => {
                  return <option value={cat.catId} key={cat.catId}>{cat.catName}</option>
                })}
              </select>
            </div>
            <div>
              <label htmlFor='dishName'>Dish Name</label>
              <input type="text" required id='dishName' ref={dishNameRef}
                defaultValue={props.defaultValue.dishName} maxLength="100" />
            </div>
          </div>
          <div className={classes.control}>
            <div>
              <label htmlFor='description'>Description</label>
              <textarea rows='6' id='description' ref={descriptionRef}
                defaultValue={props.defaultValue.description} maxLength="500" required></textarea>
            </div>
            <div>
              <label htmlFor='ingredients'>Ingredients</label>
              <textarea rows='6' required id='ingredients' ref={ingredientsRef}
                defaultValue={props.defaultValue.ingredients} maxLength="100"></textarea>
            </div>
          </div>
          <div className={classes.control}>
            <div>
              <label htmlFor='image'>Image</label>
              <input type="file" required id='image' name='image' onChange={imageHandler} />
            </div>
            <div>
              <img src={localFile} className={classes.image} alt='Dish' />
            </div>
          </div>
          <div className={classes.control}>
            <div>
              <label htmlFor='price'>Price</label>
              <input type="text" required id='price' ref={priceRef}
                defaultValue={props.defaultValue.price} maxLength="6" />
            </div>
            <div>
              <label htmlFor='servings'>Servings</label>
              <input type="text" required id='servings' ref={servingsRef}
                defaultValue={props.defaultValue.servings} maxLength="3" />
            </div>
          </div>

          <div className={classes.control}>
            <div>
              <label htmlFor='preparationTime'>Prepration Time</label>
              <input type="text" required id='preparationTime' ref={preparationTimeRef}
                defaultValue={props.defaultValue.preparationTime} maxLength="3" />
            </div>
            <div>
              <label htmlFor='cookingTime'>Cooking Time</label>
              <input type="text" required id='cookingTime' ref={cookingTimeRef}
                defaultValue={props.defaultValue.cookingTime} maxLength="3" />
            </div>
          </div>
          <div className={classes.actions}>
            <button className='btn' onClick={saveHandler}>Save</button>
            <button className='btn btn--alt' onClick={cancelHandler}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDish;