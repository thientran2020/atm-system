import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './routes/about.jsx';
import Account from './routes/account.jsx';
import Registration from './routes/registration.jsx';
import CloseAccount from './routes/closeAccount.jsx';
import OpenAccount from './routes/openAccount.jsx';
import MoibleDeposit from './routes/moibleDeposit.jsx';
import Profile from './routes/profile.jsx';
import TrasnferFunds from  './routes/transferFunds.jsx';
import Home from './routes/home.jsx';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="Registration" element={<Registration />}/>
        <Route path="Account" element={<Account />}/>
        <Route path="About" element={<About />}/>

        <Route path="closeAccount" element={<CloseAccount />}/>
        <Route path="openAccount" element={<OpenAccount />}/>
        <Route path="profile" element={<Profile />}/>

        <Route path="moibleDeposit" element={<MoibleDeposit />}/>
        <Route path="trasnferFunds" element={<TrasnferFunds />}/>
        <Route path="home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
