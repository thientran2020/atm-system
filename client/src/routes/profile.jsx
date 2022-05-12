import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import '../css/profile.css'

export default class Profile extends Component {
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

	handleSubmit() {
		const user = {
			"username": this.state.user.username,
			"address": this.state.user.address,
			"city": this.state.user.city,
			"state": this.state.user.state,
			"zipCode": this.state.user.zipCode,
			"phoneNumber": this.state.user.phoneNumber
		}
		fetch('http://localhost:4040/user/update', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(data => data.json())
		window.location.reload()
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		const user = this.state.user
		if (user) {
			return (
				<div className="div-container">
					<div id="user-info">
						<img src={logo} className='logo' alt='profile'/> 
						<h1>Hi {user.firstName} !!!</h1>
						<p><span>Username:</span> {user.username}</p>
						<p><span>Address:</span> {user.address}, {user.city} {user.state} {user.zipCode}</p>
						<p><span>Phone Number:</span> {this.state.user.phoneNumber}</p>  
					</div>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}