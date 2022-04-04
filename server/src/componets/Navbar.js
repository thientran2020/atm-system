import React from 'react'
import {Route , Link} from "react-router-dom";
import logo from '../img/sjsu.jpg'
import home from '../pages/home'



function NavBar() {
   
    
    return (

/// navBar  creation 
 <div class="navbar" id="navbar">
      <img src={logo} className='logoNav'/> 



  <a href="#Home" class="active">Home</a>
  <a href="Profile">Profile</a>


  <div class="dropdown" >
    
    <button class="dropbtn">Account 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Open Account </a>
      <a href="#">Close Account</a>
      <a href="#">Moible Deposit</a>
      <a href="#">Transfer Funds</a>
    
    </div>

    

  </div> 
  <button class="btn" >Log Out  </button>
</div>




    )
}

export default NavBar
