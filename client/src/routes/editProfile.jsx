import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/profile.css'

export default class EditProfile extends Component {
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
		window.location.href = '/profile'
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
        const user = this.state.user
		if (user) {
			return (
				<div className="div-container">
					<div id="update-info">
						<h1>Update your personal information below: </h1>
						<form>
							<label>
								<span>Address</span>
								<input type="text" 
									onChange={e => this.state.user.address=e.target.value}/>
							</label>
							<label>
								<span>City</span>
								<input type="text"
									onChange={e => this.state.user.city=e.target.value}/>
							</label>
							<label>
								<span>State</span>
								<input type="text"
									onChange={e => this.state.user.state=e.target.value}/>
							</label>
							<label>
								<span>Zip Code</span>
								<input type="text"
									onChange={e => this.state.user.zipCode=e.target.value}/>
							</label>
							<label>
								<span>Phone Number</span>
								<input type="text"
									onChange={e => this.state.user.phoneNumber=e.target.value}/>
							</label>
						</form>
						<button 
							id="update-profile" 
							type="submit" 
							onClick={this.handleSubmit.bind(this)}>
							Update
						</button>
					</div>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}