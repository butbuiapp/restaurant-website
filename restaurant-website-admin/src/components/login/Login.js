import classes from './Login.module.css';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AuthService from '../../services/AuthService';
import DisplayMessage from '../displayMessage/DisplayMessage'

function Login() {
  const [error, setError] = useState("");

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const res = await AuthService.login(enteredUsername, enteredPassword);
    if (res) {
      if (res.success) {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('username', res.username);
        navigate('/reservation');
      } else {
        setError(res.error);
      }
    } else {
      setError('There is something wrong. Please try again.');
    }
  }

  return <div className={classes.container}>
    <h2>Login</h2>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className='error_container'>
        {error && <DisplayMessage message={error} type="error" />}
      </div>
      <div>
        <div>
          <label>Username</label>
          <input type='text' id='username' required ref={usernameRef} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>       
        <div className='actions'>
          <button className='btn'>Login</button>
        </div>
      </div>
    </form>
  </div>
}

export default Login;