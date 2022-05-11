import React, { Component } from 'react';

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
		if (this.state.user) {
			return (
				<div className="div-container">
					<h1>Welcome {this.state.user.firstName}</h1>
					<p>Thank you for being our valued customer!</p>
					<p id="welcome-message">Please navigate to "My Account" to view your balances.</p>
				</div>
			)
		}
		return (
			<div className="div-container">
				<h1>Welcome</h1>
			</div>
		)
	}
}