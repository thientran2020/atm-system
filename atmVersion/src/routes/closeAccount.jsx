import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/account.css'

export default class CloseAccount extends Component {
	state = {}

	fetchData() {
		return fetch('http://localhost:4040/account', 
		{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
			}
		}).then(res => {
			if (res.status >= 403) {
				localStorage.clear()
				window.location.reload()
			}
			return res.json()
		}).then(data => {this.setState({ account: data })})
	}

	handleSubmit() {
		const accountID = document.querySelector('#account-id').value
		fetch('http://localhost:4040/closeAccount', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "accountID": accountID })
		}).then(data => {
			if (!alert("Thank you! Your account has been successfully closed...!!!")) {
				window.location.reload()
			}		
		}).catch(err => {
			alert(err)
		})
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		const account = this.state.account
		if (account) {
			let message
			if (account.length == 0) {
				message = <h3>You don't have any account yet...!!!</h3>
			} else {
				message = <h3>Choose account to close...!!!</h3>
			}
			return (
				<div className="div-container">
					{message}
					<select name="account-id" id="account-id">
						{account.map((acc) => 
							<option value={acc.accountID}>{acc.accountType} ending in {acc.accountID}</option>
						)}
					</select>
					<button 
						id="close-account" 
						type="submit" 
						onClick={this.handleSubmit.bind(this)}>
						CLOSE
					</button>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}