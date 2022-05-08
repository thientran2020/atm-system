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
			
			<div className="box">
			<h1>Welcome </h1>
			<div className="keys">
			
			<button type="button" ><a href="/account">Account</a></button>
			<button type="button" ><a href="/profile">Profile</a></button>
			<button type="button" ><a href="/mobileDeposit">Deposit</a></button>
			<button type="button" ><a href="/mobileWindraw">Windraw</a></button>
			<button type="button" ><a href="/transferFunds">Transfer</a></button>
			<button type="button" ><a href="/printStatement">Print Statement</a> </button>
			<button type="button" ><a href="/printStatement">Contact Us</a> </button>
			<button type="button" ><a href="/aboutUs">About Us</a></button>
			<button type="button"><a href="/" onClick={() => {
					localStorage.clear()
					window.location.reload()
				}}>Sign Out</a></button>
		
		  </div>
		  </div>
		)
	}
}

