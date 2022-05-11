import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from './routes/registration.jsx'
import ATM from './routes/atm.jsx'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />}/>
        <Route path="registration" element={<Registration />}/>
        <Route path="atm" element={<ATM />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
