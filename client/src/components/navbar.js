import React from 'react'

export default function NavBar() {
    return (
      <nav id="navigation-bar">
		<ul>
			<li><a href="/">Welcome</a></li>
			<li>
				<a href="/profile">User Profile</a>
				<ul>
					<li><a href="/editProfile">Update User Info</a></li>
					<li><a href="/transaction">My Transactions</a></li>
				</ul>
			</li>
			<li>
				<a href="/account">My Accounts</a>
				<ul>
					<li><a href="/openAccount">Open New Account</a></li>
					<li><a href="/closeAccount">Close Existing Account</a></li>
					<li><a href="/mobileDeposit">Mobile Check Deposit</a></li>
					<li><a href="/transferFunds">Make A Transfer</a></li>
				</ul>
			</li>
			<li>
				<a href="/aboutUs">About Us</a>
			</li>
			<li id="sign-out">
				<a href="/" onClick={() => {
					localStorage.clear()
					window.location.reload()
				}}>Sign Out</a>
			</li>
		</ul>
	</nav>
    )
}