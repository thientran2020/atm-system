import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Transaction extends Component {
	state = {
		images: []
	}

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
		}).then(data => {
			this.setState({ transaction: data })
			this.state.transaction.map((tran) => {
				const imagePath = tran.transactionImage.split("/")[2]
				fetch(`http://localhost:4040/image?image=${imagePath}`, {method: 'GET'})
					.then(res => {this.setState({ images: [...this.state.images, res.url] })})
			})
		})
	}

	async componentDidMount() {
		await this.fetchData()
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
                            <p><span>Receiver:</span> {tran.receiver}</p>
                            <p><span>From Account :</span> {tran.fromAccount}</p>
                            <p><span>To Account:</span> {tran.toAccount}</p>
                            <p><span>Transaction Date:</span> {tran.transactionDate}</p>
							<p><span>Transaction Type:</span> {tran.transactionType}</p>
							<p>
								<span>Transaction Image:</span> 
								{ this.state.images[i] && <img src={this.state.images[i]}/> }
							</p>
                        </div>	
                    )}
				</div>
			)
		}
		return (<Link to="/" />)
	}
}