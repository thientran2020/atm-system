import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/transfer.css'

export default class TransferFunds extends Component {
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
		const fromAccount = document.querySelector('#fromAccount').value
		const toAccount = document.querySelector('#toAccount').value
		const amount = document.querySelector('#amount').value

		// Data validation
		if (fromAccount === toAccount) {
			return alert('You cannot transfer money from an account to itself...!')
		}
		if (isNaN(amount) || (!amount)) {
			return alert("Please enter a valid number for balance!")
		}
		if (parseFloat(amount) < 0) {
			return alert(`Transfer amount must not be negative..!`)
		}

		let fromAccountBalance
		let toAccountBalance
		for (let index in this.state.account) {
			if (this.state.account[index].accountID == fromAccount) {
				fromAccountBalance = parseFloat(this.state.account[index].balance)
			}
			if (this.state.account[index].accountID == toAccount) {
				toAccountBalance = parseFloat(this.state.account[index].balance)
			}
			if (fromAccountBalance && toAccountBalance) {
				break
			}
		}

		if (fromAccountBalance < amount) {
			return alert(`Transfer amount must be bigger than current account balance...!`)
		}

		fromAccountBalance = fromAccountBalance - parseFloat(amount)
		toAccountBalance = toAccountBalance + parseFloat(amount)

		fetch('http://localhost:4040/updateAccount', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"fromAccount": fromAccount,
				"toAccount": toAccount,
				"fromAccountNewBalance": fromAccountBalance,
				"toAccountNewBalance": toAccountBalance, 
				"transactionType": "Transfer"
			})
		}).then(() => {
			if (!alert(`Thank you! Transfered successfully...!!!`)) {
				window.location.reload()
			}		
		})
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		const account = this.state.account
		if (account) {
			if (account.length < 2) {
				return (
					<div className="div-container">
						<h3>You need at least 2 accounts to transfer money...!</h3>
					</div>
				)
			}
			return (
				<div className="div-container">
					<h3>Choose account to transfer...!!!</h3>
					<div className='container'> 
						<span>From</span>
						<select id="fromAccount">
							{account.map((acc) => 
								<option value={acc.accountID}>{acc.accountType} ending in {acc.accountID}</option>
							)}
						</select>
					</div>
					<div className='container'>
					<span>To</span>
						<select id="toAccount">
							{account.map((acc) => 
								<option value={acc.accountID}>{acc.accountType} ending in {acc.accountID}</option>
							)}
						</select>
					</div>
					<div className='container'>
						<span>Amount</span>
						<input type="text" id="amount"/>
					</div>
					<button 
						id="transfer" 
						type="submit" 
						onClick={this.handleSubmit.bind(this)}>
						TRANSFER
					</button>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}