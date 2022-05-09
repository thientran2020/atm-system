import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../css/transfer.css'
import Footer from '../components/footer.js';
export default class MobileWindraw extends Component {
	state = {};
	componentDidMount() {this.fetchData();}
	fetchData() {
		let token = localStorage.getItem("accessToken");
		let headers = {"Authorization": "Bearer " + JSON.parse(token)};
		let arr = {method: "GET", headers: headers}
		let value = fetch("http://localhost:4040/account", arr).then(res => {
			if (res.status >= 403) {
				localStorage.clear();
				window.location.reload();
			}

			return res.json();
		}).then(data => {this.setState({account: data})});

		return value;
	}

	handleSubmit() {
	
		const to = document.querySelector("#toAccount").value;
		const amount = document.querySelector("#amount").value;

		 if (isNaN(amount) || !amount)
			return alert("Input must be a number.");
		else if (parseFloat(amount) < 0)
			return alert("Amount cannot be negative.");

		let balanceFrom;
		let balanceTo;
		for (let index in this.state.account) {
			if (this.state.account[index].accountID == amount)
				balanceTo = parseFloat(this.state.account[index].balance);

			if (this.state.account[index].accountID == to)
				balanceTo = parseFloat(this.state.account[index].balance);

			if  (balanceTo < amount)
					return alert("Insufficient funds.");
				else
					break;
		}

		
		balanceTo -= parseFloat(amount);

		let token = localStorage.getItem("accessToken");
		let headers = {
			"Authorization": "Bearer " + JSON.parse(token),
			"Content-Type": "application/json",
		};

		let body = JSON.stringify({
			
			"toAccount": to,
			"toAccountNewBalance": balanceTo,
			"transactionType": "Atm Windraw",
		});

		let arr = {method: "POST", headers: headers, body: body};
		fetch("http://localhost:4040/winAccount", arr).then(() => {
			if (!alert("Windraw successful."))
				window.location.reload();
		});
	}

	render()  {
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
							
						</div>
					</div>
					<div class="flex">
	          <div class="row">
	            <div class="left"><span class="category">Windraw From</span></div>
	            <div style={{"min-width":"14px"}}></div>
	            <select class="category" id="toAccount"> {
								account.map(acc =>
									<option value={acc.accountID}>
										{acc.accountType} # {acc.accountID} Amount in Account is  ${acc.balance}
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
			<footer id="app-footer">
			<Footer />
		</footer>


				</div>
			)
		}

		return (<Link to="/"/>);
	}
}