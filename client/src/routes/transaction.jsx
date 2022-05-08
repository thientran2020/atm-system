import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Transaction extends Component {
	state = {}

	fetchData() {
		return fetch('http://localhost:4040/transaction', 
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
		}).then(data => {this.setState({ transaction: data })})
	}

	componentDidMount() {
		this.fetchData()
        console.log(this.state.transaction)
	}

	render() {
		const transaction = this.state.transaction
		if (transaction) {
			return (
				<div className="div-container">
                    <h3>MY TRANSACTIONS</h3>
                    {transaction.map((tran, i) => 
                        <div className="transaction-info">
                            <h4>Transaction #{i+1}</h4>
                            <p><span>Transaction number:</span> {tran.transactionID}</p>
                            <p><span>Sender:</span> {tran.sender}</p>
                            <p><span>Receiver:</span> ${tran.receiver}</p>
                            <p><span>From Account :</span> {tran.fromAccount}</p>
                            <p><span>To Account:</span> ${tran.toAccount}</p>
                            <p><span>Transaction Date:</span> ${tran.transactionDate}</p>
                        </div>	
                    )}
				</div>
			)
		}
		return (<Link to="/" />)
	}
}