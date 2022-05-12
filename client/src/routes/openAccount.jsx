import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/account.css'

export default class OpenAccount extends Component {
	state = {
		account: {
			accountType: "Checking",
			balance: null
		}
	}

	handleSubmit() {
		const account = {
			"accountType": this.state.account.accountType,
			"balance": this.state.account.balance
		}
		if (isNaN(account.balance)) {
			alert("Please enter a valid number for the balance!")
		} else if (parseFloat(account.balance) <= 0) {
			alert("Please enter a positive number for the balance!")
		} else if (parseFloat(account.balance) < 500) {
			alert("Our apologies. The minimum balance to open a new account is $500!")
		} else {
			fetch('http://localhost:4040/addAccount', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(account)
			}).then(data => {
				if (!alert("Success! Your account has been successfully created!!!")) {
					window.location.reload()
				}		
			})
			.catch(err => {
				alert(err)
			})
		}
	}

	render() {
		const account = this.state.account
		if (account) {
			return (
				<div className="div-container">
					<div className="account-info">
						<h3>Please fill in the information below to open a new account:</h3>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<label>
								<span>Account Type:</span>
								<select 
									name="account-type" 
									id="account-type"
									onChange={e => this.state.account.accountType=e.target.value}
								>
									<option value="Checking">Checking</option>
									<option value="Saving">Saving</option>
								</select>
							</label>
							<label>
								<span>Initial Balance:</span>
								<input type="text"
									onChange={e => this.state.account.balance=e.target.value}/>
							</label>
						</form>
						<button 
							id="open-account" 
							type="submit" 
							onClick={this.handleSubmit.bind(this)}>
							CREATE
						</button>
					</div>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}