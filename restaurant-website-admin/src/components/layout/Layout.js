import classes from './Layout.module.css';
import MainNavigation from './MainNavigation';
import AuthService from '../../services/AuthService';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer';

function Layout() {
  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser == null) {
      navigate('/login');
    }
  });

  return <div>
    <MainNavigation />
    <main className={classes.main}>{outlet}</main>
    <Footer/>
  </div>
}

export default Layout;