import React from 'react';
import NavBar from '../components/navbar';
import Foot from '../components/footer';
import logo from '../img/logo.png';
function home(){

return(

    <div  >
    <header className="App-header">
     <h1> ATM SYSTEM PROJECT </h1>
     <NavBar />
   </header>
   
   <body  className="profilex" >
<img src={logo} className='logo'/> 

 <h1>Customer Profile </h1>
 <h2>Customer Name:John</h2>
 <h2>Customer Address</h2>
 <h2>Customer Phone</h2>


 </body>
 
 <footer>
<Foot />

</footer> 
 
 </div>

)

}
export default home;