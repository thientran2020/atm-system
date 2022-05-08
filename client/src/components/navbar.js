import React from 'react'

export default function NavBar() {
	function handleOnClick() {
		document.getElementById('user-info').style.display = 'none'
		document.getElementById('update-info').style.display = 'block'
	}

    return (
      <nav id="navigation-bar">
		<ul>
			<li><a href="/">Home</a></li>
			<li>
				<a href="/profile">Profile</a>
				<ul>
					<li><a onClick={handleOnClick}>Update Profile</a></li>
					<li><a href="/transaction">Transactions</a></li>
				</ul>
			</li>
			<li>
				<a href="/account">My Account</a>
				<ul>
					<li><a href="/openAccount">Open New Account</a></li>
					<li><a href="/closeAccount">Close Existing Account</a></li>
					<li><a href="/mobileDeposit">Mobile Deposit</a></li>
					<li><a href="/transferFunds">Pay &amp; Transfer</a></li>
				</ul>
			</li>
			<li>
				<a href="#">Services</a>
				<ul>
					<li><a href="#0">Statement</a></li>
					<li><a href="/aboutUs">Contact Us</a></li>
				</ul>
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