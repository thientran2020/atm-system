import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import './css/navbar.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AboutUs from './routes/about.jsx';
import Account from './routes/account.jsx';
import Registration from './routes/registration.jsx';
import CloseAccount from './routes/closeAccount.jsx';
import OpenAccount from './routes/openAccount.jsx';
import MoibleDeposit from './routes/moibleDeposit.jsx';
import Profile from './routes/profile.jsx';
import TrasnferFunds from  './routes/transferFunds.jsx';
import NavBar from './components/navbar.js';
import Footer from './components/footer.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <header id="app-header">
        <h1> ATM SYSTEM PROJECT </h1>
        <NavBar />
      </header>

      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="registration" element={<Registration />}/>
        <Route path="account" element={<Account />}/>
        <Route path="aboutUs" element={<AboutUs />}/>

        <Route path="closeAccount" element={<CloseAccount />}/>
        <Route path="openAccount" element={<OpenAccount />}/>
        <Route path="profile" element={<Profile />}/>

        <Route path="mobileDeposit" element={<MoibleDeposit />}/>
        <Route path="transferFunds" element={<TrasnferFunds />}/>
      </Routes>

      <footer id="app-footer">
        <Footer />
      </footer> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
