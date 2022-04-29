import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useToken from './components/useToken.js';
import Login from './components/login.js';
import AboutUs from './routes/about.jsx';
import Account from './routes/account.jsx';
import CloseAccount from './routes/closeAccount.jsx';
import OpenAccount from './routes/openAccount.jsx';
import MoibleDeposit from './routes/moibleDeposit.jsx';
import Profile from './routes/profile.jsx';
import TrasnferFunds from  './routes/transferFunds.jsx';
import Welcome from './routes/welcome.jsx';
import NavBar from './components/navbar.js';
import Footer from './components/footer.js';
import './css/App.css';
import './css/navbar.css';


function App() {
	const { token, setToken } = useToken();
	if (token == null) {
		return <Login setToken={ setToken } />
	}
	return (
		<div className="main">
		<header className="app-header">
			<h1> ATM SYSTEM PROJECT </h1>
			<NavBar />
		</header>
		<Routes>
			<Route path="/" element={<Welcome />}/>
			<Route path="/account" element={<Account />}/>
			<Route path="/aboutUs" element={<AboutUs />}/>
			<Route path="/closeAccount" element={<CloseAccount />}/>
			<Route path="/openAccount" element={<OpenAccount />}/>
			<Route path="/profile" element={<Profile />}/>
			<Route path="/mobileDeposit" element={<MoibleDeposit />}/>
			<Route path="/transferFunds" element={<TrasnferFunds />}/>
		</Routes>
		<footer id="app-footer">
			<Footer />
		</footer>
		</div>
	);
}

export default App;
