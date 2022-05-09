import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login.js';
import AboutUs from './routes/about.jsx';
import Account from './routes/account.jsx';
import CloseAccount from './routes/closeAccount.jsx';
import OpenAccount from './routes/openAccount.jsx';
import MoibleDeposit from './routes/moibleDeposit.jsx';
import MoibleWindraw from './routes/moibleWindraw.jsx';
import Profile from './routes/profile.jsx';
import PrintStatement from './routes/printStatement.jsx';
import TrasnferFunds from  './routes/transferFunds.jsx';
import Welcome from './routes/welcome.jsx';
import ContactUs from './routes/contactUs.jsx';
import NavBar from './components/navbar.js';
import Footer from './components/footer.js';
import useToken from './helper/helper.js';
import './css/App.css';
import './css/navbar.css';

function App() {
	const { token, setToken } = useToken();
	if (!token) {
		return <Login setToken={setToken} />
	}
	return (
		<div className="main">
	
	
		
		<Routes>
			<Route exact path="/" element={<Welcome />}/>
			<Route path="/account" element={<Account />}/>
			<Route path="/aboutUs" element={<AboutUs />}/>
			<Route path="/closeAccount" element={<CloseAccount />}/>
			<Route path="/openAccount" element={<OpenAccount />}/>
			<Route path="/profile" element={<Profile />}/>
			<Route path="/mobileDeposit" element={<MoibleDeposit/>}/>
			<Route path="/mobileWindraw" element={<MoibleWindraw />}/>
			<Route path="/transferFunds" element={<TrasnferFunds />}/>
			<Route path="/printStatement" element={<PrintStatement/>}/>
			<Route path="/contactUs" element={<ContactUs />}/>
		</Routes>
	

		</div>



	);
}

export default App;
