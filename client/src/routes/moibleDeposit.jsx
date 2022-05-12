import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/deposit.css'

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
		const image = document.querySelector(`#img`).files[0]

		if (isNaN(amount)) {
			alert("Please enter a valid number for balance!")
		} else if (parseFloat(amount) <= 0) {
			alert(`Please enter a positive ${action.toLowerCase()} amount!`)
		} else {
			let balance
			for (let index in this.state.account) {
				if (this.state.account[index].accountID == accountID) {
					balance = parseFloat(this.state.account[index].balance)
					break
				}
			}
			if (action == 'Withdraw' && balance < amount) {
				alert(`Our apologies. The maximum amount that can be withdrawn is ${balance}`)
				return
			}
			if (!image) {
				alert(`Please upload a photo of the check you would like to deposit!`)
				return
			}
			if (!accountID) {
				alert(`You don't have any open accounts yet. Please open one before making a deposit!`)
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
					"fromAccount": accountID,
					"toAccount": accountID,
					"fromAccountNewBalance": newBalance,
					"toAccountNewBalance": newBalance, 
					"transactionType": action,
					"transactionAmount": amount
				})
			}).then(res => {
				return res.json()	
			}).then(data => {
				const transactionID = data.transactionID
				const formData = new FormData()
				formData.append("image", image)
				formData.append("transactionID", transactionID)
				axios.post('http://localhost:4040/api/image', formData, { headers: {'Content-Type': 'multipart/form-data'}})
				.then(() => {
					if (!alert(`${action} successfully!!!`)) {
						window.location.reload()
					}
				})
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
				message = <h3>You do not have any open accounts!!!</h3>
			} else {
				message = <h3>Fill out the information below to deposit a check:</h3>
			}
			return (
				<div className="div-container">
					{message}
					<div className='container'>
						<select name="action" id="action">
							<option value="Deposit">Deposit</option>
						</select>
						<select name="account-id" id="account-id">
							{account.map((acc) => 
								<option value={acc.accountID}>{acc.accountType} ending in {acc.accountID}</option>
							)}
						</select>
					</div>
					<div className='container'>
						<span>Deposit amount ($):</span>
						<input type="number" id="amount"/>
					</div>
					
					<div className='container'>
						<form>
							<label for="img" id="upload-check">Upload check:</label>
							<input type="file" id="img" name="img" accept="image/*"/>	
						</form>
					</div>
					<button 
						id="execute" 
						type="submit" 
						onClick={this.handleSubmit.bind(this)}>
						DEPOSIT
					</button>
				</div>
			)
		}
		return (<Link to="/" />)
	}
}