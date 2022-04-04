import logo from './logo.png';
import {Route , Link} from "react-router-dom";
import profile from './pages/profile';
import NavBar from './componets/Navbar';
import BottomFooter from './componets/footer';
import './App.css';
import bg from './img/sjsu.jpg';
import { Profiler } from 'react';


function App() {
   

  return (
   
    <div className="App" >
<style>{'body { background-color: gold; }' }</style>
   {/* importing navbar from componets module */}
      <NavBar/>
    
   { /* example of web page  */}

      <div  className="profile" >
    <img src={logo} className='logo'/> 

    <h1>Customer Profile </h1>
    <h2>Customer Name:John</h2>
    <h2>Customer Address</h2>
    <h2>Customer Phone</h2>

    </div>
{/* importing footer from componets module  */}
    
      <BottomFooter/>
    </div>

    

  );
}

export default App;
