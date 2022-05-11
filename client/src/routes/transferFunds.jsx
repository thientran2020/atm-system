import React, {Component} from "react"
import {Link} from "react-router-dom"
import "../css/transfer.css"

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
 		if (fromAccount == toAccount) {
 			return alert('You cannot transfer money from an account to itself...!')
 		}
 		if (isNaN(amount) || (!amount)) {
 			return alert("Please enter a valid number for balance!")
 		}
 		if (parseFloat(amount) < 0) {
 			return alert(`Transfer amount must be positive!`)
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
		
		console.log(fromAccountBalance)
		console.log(toAccountBalance)
		console.log(amount)

 		if (fromAccountBalance < amount) {
 			return alert(`Insufficient funds. Maximum amount is ${amount}!`)
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
 				"transactionType": "Transfer",
				"transactionAmount": amount
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
		const account = this.state.account;
		if (account) {
			if (account.length < 2) {
				return (
					<div class="div-container">
						<h3>You need at least 2 accounts to transfer money...!</h3>
					</div>
				);
			}

			return (
				<div className="div-container" style={{"background-color":"#4D5566"}}>
					<div class="flex">
						<div class="row">
							<div class="left"><span class="category">TRANSFER FROM</span></div>
							<div style={{"min-width":"14px"}}></div>
							<select class="category" id="fromAccount"> {
								account.map(acc =>
									<option value={acc.accountID}>
										{acc.accountType} | {acc.accountID} | ${acc.balance}
									</option>
								)
							} </select>
						</div>
					</div>
					<div class="flex">
	          	<div class="row">
	            
				<div class="left"><span class="category">TRANSFER TO</span></div>
	            <div style={{"min-width":"14px"}}></div>
	            <select class="category" id="toAccount"> {
						account.map(acc =>
							<option value={acc.accountID}>
								{acc.accountType} | {acc.accountID} | ${acc.balance}
							</option>
						)
					} </select>
	          		</div>
				</div>
					<div class="flex">
				<div class="row">
					<div class="left"><span class="category">AMOUNT</span></div>
					<div style={{"min-width":"14px"}}></div>
					<input class="right" type="number" id="amount"></input>
				</div>
	        	</div>
					<div class="flex">
	          <div class="row">
	            <button class="category">CANCEL</button>
	            <div style={{"min-width":"14px"}}></div>
	            <button class="category" id="transfer" type="submit" onClick={this.handleSubmit.bind(this)}>
						CONFIRM
						</button>
	          </div>
	        </div>
				</div>
			)
		}

		return (<Link to="/"/>);
	}
}
