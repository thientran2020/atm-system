import React from 'react'

export default function NavBar() {
    return (
      <nav id="navigation-bar">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/profile">Profile</a></li>
			<li>
				<a href="/account">Account</a>
				<ul>
					<li><a href="/openAccount">Open New Account</a></li>
					<li><a href="/closeAccount">Close Existing Account</a></li>
					<li><a href="/mobileDeposit">Mobile Deposit</a></li>
					<li><a href="/transferFunds">Pay &amp; Transfer</a></li>
				</ul>
			</li>
			<li>
				<a href="#0">Services</a>
				<ul>
					<li><a href="#0">Statement</a></li>
					<li><a href="/aboutUs">Contact Us</a></li>
				</ul>
			</li>
			<li id="sign-out">
				<a href="/" onClick={() => {
					localStorage.clear();
					window.location.reload();
				}}>Sign Out</a>
			</li>
		</ul>
	</nav>
    )
}