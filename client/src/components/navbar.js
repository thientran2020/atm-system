import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/sjsu.jpg'
export default function NavBar() {
    return (
        <div class="navbar" id="navbar">
        <img src={logo} className='logoNav'/> 
  
  
  
    <a href="home" class="active">Home</a>
    <a href="profile">Profile</a>
  
  
    <div class="dropdown" >
      
      <button class="dropbtn">    Account 
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="account">Open Account </a>
        <a href="closeAccount">Close Account</a>
        <a href="moibleDeposit">Moible Deposit</a>
        <a href="trasnferFunds">Transfer Funds</a>
      
      </div>
  
      
  
    </div> 
   
    <button class="btn"  ><a href="/"> LogOut  </a> </button>
   
    
  </div>
  
    )
}

function LogOut() {
  
  <a href="trasnferFunds">Transfer Funds</a>
}