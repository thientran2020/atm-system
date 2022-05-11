import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/account.css'
import Footer from '../components/footer.js';
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
				message = <p id='message'>You don't have any account yet...!!!</p>
			} else if (account.length == 1) {
				message = <p id='message'>You have 1 account...!!!</p>
			} else {
				message = <p id='message'>You have {account.length} accounts...!!!</p>
			}
			return (
				<div className="div-container">
						{message}
						{account.map((acc, i) => 
							<div className="account-info">
								<h4>Account #{i+1}</h4>
								<p><span>Account Number:</span> {acc.accountID}</p>
								<p><span>Account Type:</span> {acc.accountType}</p>
								<p><span>Balance:</span> ${acc.balance}</p>
							</div>	
						)}
		<footer id="app-footer">
			<Footer />
		</footer>
				</div>
				
			)
		}
			
		
		return (<Link to="/" />)
		
	}
	
}