import classes from './MainNavigation.module.css';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

function MainNavigation() {
  const navigate = useNavigate();

  function logoutHandler() {
    AuthService.logout();
    navigate('/');
  }

  return <header className={classes.header}>
    <div className={classes.logo}>
      Restaurant Admin
    </div>
    <nav>
      <ul>
        <li>
          <Link to='/dish'>Manage Dish</Link>
        </li>
        <li>
          <Link to='/order'>Manage Order</Link>
        </li>
        <li>
          <Link to='/reservation'>Manage Reservation</Link>
        </li>
        <li>
          <button onClick={logoutHandler} className={classes.btn_logout}>Logout</button>
        </li>
      </ul>
    </nav>
  </header>
}

export default MainNavigation;