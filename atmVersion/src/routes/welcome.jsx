import React, { Component } from 'react';
import '../css/welcome.css'
export default class Welcome extends Component {
	state = {}

	componentDidMount() {
		fetch('http://localhost:4040/user', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
		}})
		.then(response => response.json())
  		.then(data => {this.setState({ user: data.user })});
	}

	render() {
	
		return (
			<div className='boxGui'>
			<h1>Welcom</h1>
			<div className="keys">
			
			<button type="button" ><a href="/account">Account</a></button>
			<button type="button" ><a href="/mobileDeposit">Deposit</a></button>
			<button type="button" ><a href="/mobileWindraw">Deposit</a></button>
			<button type="button" ><a href="/transferFunds">Transfert</a></button>
			<button type="button" ><a href="/profile">Profile</a></button>
			<button type="button" value="6"><a href="/aboutUs">About Us</a></button>
			<button type="button" value="1">Log Out </button>
			<button type="button" value="2">Print Stament </button>
			<button type="button" value="2">Print Stament </button>
		
		
		  </div>
		  </div>
		)
	}
}

