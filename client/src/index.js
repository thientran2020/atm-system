import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import About from './routes/about.jsx';
import Account from './routes/account.jsx';
import Registration from './routes/registration.jsx';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="Registration" element={<Registration />}/>
        <Route path="Account" element={<Account />}/>
        <Route path="About" element={<About />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
