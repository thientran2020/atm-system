import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/account.css'

export default class MobileDeposit extends Component {
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
		const action = document.querySelector('#action').value
		const accountID = document.querySelector('#account-id').value
		const amount = document.querySelector('#amount').value

		if (isNaN(amount)) {
			alert("Please enter a valid number for balance!")
		} else if (parseFloat(amount) < 0) {
			alert(`${action} amount must not be negative..!`)
		} else {
			let balance
			for (let index in this.state.account) {
				if (this.state.account[index].accountID == accountID) {
					balance = parseFloat(this.state.account[index].balance)
					break
				}
			}
			if (action == 'Withdraw' && balance < amount) {
				alert(`Maximum amount can be withdrawn is ${balance}`)
				return
			}
			let newBalance = action == 'Deposit' ? balance + parseFloat(amount) : balance - parseFloat(amount)
			fetch('http://localhost:4040/updateAccount', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"accountID": accountID,
					"newBalance": newBalance
				})
			}).then(data => {
				if (!alert(`Thank you! ${action} successfully...!!!`)) {
					window.location.reload()
				}		
			})
			.catch(err => {
				alert(err)
			})
		}
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
				message = <h3>Choose account to deposit or withdraw...!!!</h3>
			}
			return (
				<div className="div-container">
					{message}
					<select name="action" id="action">
						<option value="Deposit">Deposit</option>
						<option value="Withdraw">Withdraw</option>
					</select>
					<select name="account-id" id="account-id">
						{account.map((acc) => 
							<option value={acc.accountID}>{acc.accountType} ending in {acc.accountID}</option>
						)}
					</select>
					<label>
						<span>Balance</span>
						<input type="text" id="amount"/>
					</label>
					<button 
						id="execute" 
						type="submit" 
						onClick={this.handleSubmit.bind(this)}>
						EXECUTE
					</button>	
				</div>
			)
		}
		return (<Link to="/" />)
	}
}