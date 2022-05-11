import React, { Component } from 'react';
import '../css/welcome.css'
export default class Welcome extends Component {
	state = {}

	fetchData() {
		return fetch('http://localhost:4040/user', 
		{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
			}
		}).then(res => {
			if (res.status >= 403) {
				localStorage.clear()
				window.location.reload()
			}
			return res.json()
		}).then(data => {this.setState({ user: data.user })})
	}

	
	componentDidMount() {
		this.fetchData()
	}

	render() {
		const user = this.state.user
		return (
			
			<div className="box">
			<h1> Virtual ATM</h1>
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

