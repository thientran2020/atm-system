import React, {Component} from "react"
import {Link} from "react-router-dom"
import "../css/transfer.css"

function format(value) {
	let list = value.toFixed(2).toString().split(".") // separate value into an integer and a fractional component
	let str = ""
	for (let i = 0; i < list[0].length; i++) {
		str += list[0].charAt(i)
		let u = (list[0].length - 1) - i
		if (u % 3 == 0 && 0 < u) {
			str += "," // insert a comma every three digits, except at the least significant digit
		}
	}

	return str + "." + list[1] // add back the fractional part
}

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
 			return alert('You cannot transfer money to the same account!')
 		}
 		if (isNaN(amount) || (!amount)) {
 			return alert("Please enter a valid number for the amount!")
 		}
 		if (parseFloat(amount) <= 0) {
 			return alert(`The transfer amount must be positive!`)
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
 			return alert(`Insufficient funds. The maximum amount that can be transferred is ${fromAccountBalance}!`)
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
 			if (!alert(`Thank you! Transfered successfully!`)) {
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
						<h3>You must have 2 open accounts to transfer funds!</h3>
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
										{acc.accountType} ending in {acc.accountID} | $ {acc.balance.toFixed(2)}
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
											{acc.accountType} ending in {acc.accountID} | $ {acc.balance.toFixed(2)}
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
							<button class="category"><a class="cancel" href="/">CANCEL</a></button>
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
