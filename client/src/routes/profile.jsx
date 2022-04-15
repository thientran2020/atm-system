import React from 'react';
import NavBar from '../components/navbar';
import Foot from '../components/footer';
import logo from '../img/logo.png';

export default function Profile(){
return(
    
 

    <div  >


<script >
ReactDOM.render(
  <h1>john</h1>,
  document.getElementById('id01'));
</script>

       <header className="App-header">
        <h1> ATM SYSTEM PROJECT </h1>
        <NavBar />
      </header>
      
      <body  className="profilex" >
<img src={logo} className='logo'/> 

    <h1>Customer Profile </h1>
    <h2 >Customer Name:<Name/></h2>
    <h2>Customer Address:<Add/></h2>
    <h2>Customer Phone<Phone/></h2>


    </body>
    
    <footer>
  <Foot />
 
</footer> 
    
    </div>



)


}
function Name() {

  
  return <div>John Lopez</div>;   
}

function Add() {
  return <div>1 Washington Sq, San Jose, CA 95192</div>;   
}
function Phone() {
  return <div>408 999-999</div>;   
}