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

	handleSubmit(accountID) {
		fetch('http://localhost:4040/closeAccount', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "accountID": accountID })
		}).then(data => {
			if (!alert("Success! Your account has been successfully closed.")) {
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
			return (
				<div className="div-container">
					<h3>Select an account to close:</h3>
					<p></p>
					<table class="fl-table">
						<thead>
							<tr>
								<th>Account ID</th>
								<th>Account Type</th>
								<th>Balance</th>
								<th></th>
							</tr>
						</thead>
						
						<tbody>
						{account.map((acc) => (
						<tr>
							<td>{acc.accountID}</td>
							<td>{acc.accountType}</td>
							<td>${acc.balance.toFixed(2)}</td>
							<td>
								<button 
									id={"close-account" + acc.accountID}
									type="submit"
									onClick={e => this.handleSubmit(acc.accountID)}>
									Close
								</button>
							</td>
						</tr>
						))}	
					</tbody>
				</table>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}