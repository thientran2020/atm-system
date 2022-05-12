import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/account.css'

export default class Account extends Component {
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

	componentDidMount() {
		this.fetchData()
	}

	render() {
		const account = this.state.account
		if (account) {
			let message
			if (account.length == 0) {
				message = <p id='message'>You don't have any open accounts yet...!!!</p>
			} else if (account.length == 1) {
				message = <p id='message'>You have 1 open account!!!</p>
			} else {
				message = <p id='message'>You have {account.length} open accounts!!!</p>
			}
			return (
				<div className="div-container">
						{message}
						<table class="fl-table">
							<thead>
								<tr>
									<th>Account #</th>
									<th>Account ID</th>
									<th>Account Type</th>
									<th>Account Balance</th>
								</tr>
							</thead>
							
							<tbody>
								{account.map((acc, i) => (
								<tr>
									<td>{i+1}</td>
									<td>{acc.accountID}</td>
									<td>{acc.accountType}</td>
									<td>$ {acc.balance.toFixed(2)}</td>
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