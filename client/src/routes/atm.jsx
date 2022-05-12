import React, { Component } from 'react'
import '../css/atm.css'

export default class ATM extends Component {
    state = {
        username: localStorage.getItem("username"),
        pin: localStorage.getItem("pin"),
    }

    handleSubmit(e) {
        e.preventDefault();
        if (isNaN(this.state.pin) || parseFloat(this.state.pin) < 0) {
            return alert("PIN must be positive number string...!")
        }

        fetch('http://localhost:4040/atm/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                "username": this.state.username,
                "pin": this.state.pin
            })
		}).then(res => res.json())
        .then(data => {
            if (data.message) {
                alert(data.message)
                window.location.reload()
            }
            this.setState({ user: data.user })

            fetch(`http://localhost:4040/atm/account?username=${data.user.username}&pin=${data.user.pin}`, 
            { method: 'GET' })
            .then(res => res.json())
            .then(data => this.setState({ account: data }))
        })
    }

    handleExecute(e) {
        e.preventDefault();
        const action = this.state.action
		const accountID = document.querySelector("#account-id").value
		const amount = document.querySelector('#amount').value

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
        if (amount <= 0) {
            alert(`${this.state.action} amount must be positive...!`)
            return
        }
        if (!accountID) {
            alert(`Sorry you don't have any account to deposit...!`)
            return
        }

        let newBalance = action == 'Deposit' ? balance + parseFloat(amount) : balance - parseFloat(amount)
        this.setState(prevState => ({
            account: prevState.account.map(
            acc => (acc.accountID == accountID ? Object.assign(acc, { balance: newBalance }) : acc)
          )
        }));

        fetch('http://localhost:4040/atm/updateAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "username": this.state.username,
                "fromAccount": accountID,
                "toAccount": accountID,
                "fromAccountNewBalance": newBalance,
                "toAccountNewBalance": newBalance, 
                "transactionType": action + " ATM",
                "transactionAmount": amount
            })
        }).then(res => res.json())
        .then(data => {
            let message
            if (this.state.action == "Deposit") {
                message = "Deposit to"
            } else {
                message = "Withdraw from"
            }

            if(!alert(`Printing statement...! \n
                Your transaction ID is ${data.transactionID}.\n
                ${message} account ID ${accountID}: $${amount}.
                Date: ${new Date()}.\n
                Thank you ^^`)) {
            }
            document.querySelector('#amount').value = ""
        })
    }

	render() {
        const user = this.state.user
        if (!user) {
            return (
                <div className="atm">
                    <h1>SJSU ATM MACHINE</h1>
                    <form onSubmit={this.handleSubmit}>
                        <p>Please insert your card and Enter username + PIN.</p>
                        <p>
                            <label>Username</label>
                            <input 
                                type="text" 
                                id="username"
                                placeholder={'Enter your username'}
                                onChange={e => this.setState({ username: e.target.value })}/>
                        </p>
                        <p>
                            <label>PIN</label>
                            <input 
                                type="text" 
                                id="pin"
                                placeholder={'Enter your PIN'}
                                onChange={e => this.setState({ pin: e.target.value })}/>
                        </p>
                        <button onClick={e => this.handleSubmit(e)}>ENTER BANK</button>
                    </form>     
                </div>
            )
        }

        return (
            <div className="atm">
                <h1>SJSU ATM MACHINE</h1>
                <p>Hey {user.firstName}, what would you like to do today?</p>
                <div className="button-board">
                    <button 
                        value="Deposit"
                        onClick={e => this.setState({action: e.target.value})}>
                        DEPOSIT
                    </button>
                    <button 
                        value="Withdraw"
                        onClick={e => this.setState({action: e.target.value})}>
                        WITHDRAW
                    </button>
                    <button
                        onClick={() => window.location.reload()}>
                        RETURN CARD</button>
                </div>

                {this.state.action && 
                    <div className="deposit-withdraw">
                        <div className='container'>
                            <span>
                                {this.state.action == "Deposit" ? "Deposit to:" : "Withdraw from:"}
                            </span>
                        <select name="account-id" id="account-id">
                            {this.state.account.map((acc) => 
                                <option value={acc.accountID}>{acc.accountType} ending in {acc.accountID}</option>
                            )}
                        </select>
                        </div>

                        <div className='container'>
                            <span>{this.state.action} amount: </span>
                            <input type="number" id="amount"/>
                        </div>
                        <button onClick={e => this.handleExecute(e)}>Execute</button>
                    </div>
                }
            </div>
        )
	}
}