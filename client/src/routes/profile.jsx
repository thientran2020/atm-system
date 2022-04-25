import React, { Component, useEffect } from 'react';
import NavBar from '../components/navbar';
import Foot from '../components/footer';
import logo from '../img/logo.png';
class profile extends Component {
  constructor(){
super();
this.state={
  //array to store data from server
 profile:[]

}
  }
    componentDidMount() {
      //poxy on json or right thr whole link
      fetch('http://localhost:4040/customer')
        .then(res => res.json())
        .then(profile => this.setState({ profile },()=> console.log ('data fench',profile)));
    }

render(){


return(
<div>

<header className="App-header">
     <h1> ATM SYSTEM PROJECT </h1>
     <NavBar />
   </header>
   
   <body  className="profilex" >
<img src={logo} className='logo'/> 
<h1>Customer Profile </h1>
{this.state.profile.map(user =>
  <h2>Name:{user.name}</h2>
  )}

{this.state.profile.map(user =>
  <h2>Address:{user.add}<br/>
  {user.add2}{user.add3}{user.add4}</h2>
  )}

 
 {this.state.profile.map(user =>
  <h2> Phone:{user.phone}</h2>
  )}
 
 

 </body>
 
 <footer>
<Foot />

</footer> 





</div>

);

}
 }       
export default profile;
    