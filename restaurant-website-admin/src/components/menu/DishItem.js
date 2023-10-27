import classes from './DishItem.module.css';
import { useNavigate } from 'react-router-dom';

function DishItem(props) {
  const navigate = useNavigate();

  function editHandler() {
    navigate('/dish/add', {state: props.dish});
  }

  function deleteHandler() {
    props.onDeleteRow(props.dish.dishId);
  }

  return (
    <tr>
      <td>{props.dish.dishId}</td>
      <td>{props.dish.dishName}</td>
      <td className={classes.price}>{props.dish.price}</td>
      <td>{props.dish.ingredients}</td>
      <td>
        <div>
          <button className='btn' onClick={editHandler}>Edit</button>
          <button className='btn btn--alt' onClick={deleteHandler}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default DishItem;