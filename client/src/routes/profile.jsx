import React from 'react';
import logo from '../img/logo.png';

export default function Profile() {
  return(
    <div className="div-container">
      <img src={logo} className='logo' alt='profile'/> 
      <h1>Customer Profile </h1>
      <h2 >Customer Name: Henry</h2>
      <h2>Customer Address: 1234 First Street, San Jose, CA 95123</h2>
      <h2>Customer Phone: 831 333 8888</h2>  
    </div>
)}