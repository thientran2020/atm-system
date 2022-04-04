import React from 'react';
import logo from '../img/logo.png';
import {Route , Link} from "react-router-dom";
function profile(){

return(

    <div  className="profile" >
    <img src={logo} className='logo'/> 

    <h1>Customer Profile </h1>
    <h2>Customer Name:John</h2>
    <h2>Customer Address</h2>
    <h2>Customer Phone</h2>

    
    </div>



)

}
export default profile;