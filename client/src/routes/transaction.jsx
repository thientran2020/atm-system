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
					<table class="fl-table">
						<thead>
							<tr>
								<th>Transaction #</th>
								<th>Transaction ID</th>
								<th>From Account</th>
								<th>To Account</th>
								<th>Transaction Date</th>
								<th>Transaction Type</th>
								<th>Transaction Image</th>
							</tr>
						</thead>
						
						<tbody>
							{transaction.map((tran, i) => (
							<tr>
								<td>{i+1}</td>
								<td>{tran.transactionID}</td>
								<td>{tran.fromAccount}</td>
								<td>{tran.toAccount}</td>
								<td>{tran.transactionDate}</td>
								<td>{tran.transactionType}</td>
								<td>{ this.state.images[i] && <img src={this.state.images[i]}/> }</td>
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