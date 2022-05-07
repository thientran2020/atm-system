import React from 'react'

export default function NavBar() {
	function handleOnClick() {
		document.getElementById('user-info').style.display = 'none'
		document.getElementById('update-info').style.display = 'block'
	}

    return (
      <nav id="navigation-bar">
		<ul>
			<li><a href="/account">Account</a></li>
			<li><a href="/profile">Profile</a></li>
				<li><a href="/mobileDeposit"> Deposit</a></li>
				<li><a href="/mobileWindraw"> Windraw</a></li>
					<li><a href="/transferFunds">Pay &amp; Transfer</a></li>
					<li><a href="/aboutUs">Contact Us</a></li>
			
					<li id="sign-out">
				<a href="/" onClick={() => {
					localStorage.clear()
					window.location.reload()
				}}>Sign Out</a>	</li>
			
		
			
		</ul>
	</nav>
    )
}