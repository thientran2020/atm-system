import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default class Profile extends Component {
	state = {}

	fetchData() {
		fetch('http://localhost:4040/user', 
		{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
			}
		}).then(res => {
			if (res.status >= 403) {
				sessionStorage.clear()
				window.location.reload()
			}
			return res.json()
		}).then(data => {this.setState({ user: data.user })})
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		if (this.state.user) {
			return (
				<div className="div-container">
					<img src={logo} className='logo' alt='profile'/> 
					<h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
					<h2>Username: {this.state.user.username}</h2>
					<h2>Address: {this.state.user.address} {this.state.user.state} {this.state.user.zipCode}</h2>
					<h2>Phone number: {this.state.user.phonerNumber}</h2>  
				</div>
			)
		}
		return (<Link to="/" />)
	}
}