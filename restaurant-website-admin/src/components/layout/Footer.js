import { memo } from 'react';
import './Footer.css';

const Footer = memo(
  function () {
    return (
      <div className='footer'>
         &copy; Copyright 09.2023 by Ngoc But Bui (React, Nodejs, MySQL)
      </div>
    )
  }
)
export default Footer;
