import React, { useState } from 'react'
import validator from 'validator' 
import '../css/registration.css'

async function registerUser(user) {
	return fetch('http://localhost:4040/register', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	}).then((data => data.json()))
}

export default function Registration() {
	const [username, setUserName] = useState()
	const [password, setPassword] = useState()
	const [confirmPassword, setConfirmPassword] = useState()
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	const [phoneNumber, setPhoneNumber] = useState()
	const [pin, setPin] = useState()
	const [checked, setChecked] = useState(false)

	const handleOnSubmit = async e => {
		e.preventDefault();
		if (!validator.isMobilePhone(phoneNumber)) {
			alert("Phone number is not valid. Please check!!!")
		} else if (password.length < 6) {
			alert("Password must have at least 6 characters. Please try a new one!!!")
		} else if (password !== confirmPassword) {
			alert("Passwords don't match. Please try again")
		} else if (!checked) {
			alert("Please check the box for terms and condition agreements!!!")
		} else if (isNaN(pin) || parseFloat(pin) < 0) {
			alert("PIN must be non-negative number string!")
		} else {
			const user = {
				"username": username,
				"password": password,
				"firstName": firstName,
				"lastName": lastName,
				"phoneNumber": phoneNumber,
				"pin": pin
			}	
			const response = await registerUser(user)
			if (!alert(response.message)) {
				window.location.href = "/"
			}		
		}
	}

	return (
	<>
		<header className="app-header">
			<h1> WELCOME TO MY ATM SYSTEM </h1>
		</header>

		<div className="div-container">
			<h2>REGISTER</h2>

			<div class ="signup-box">
				<form class="fill-box" onSubmit={handleOnSubmit}>
					<label>Username</label>
					<input type="text" required ="required"
						onChange={e => setUserName(e.target.value)} />
					
					<label>Password</label>
					<input class ="password" type="password" required ="required"
						onChange={e => setPassword(e.target.value)} />
					
					<label>Confirm Password</label>
					<input class ="confirmPassword" type="password" required ="required"
						onChange={e => setConfirmPassword(e.target.value)} />
					
					<label>First Name</label>
					<input type="text" required ="required"
						onChange={e => setFirstName(e.target.value)} />

					<label>Last Name</label>
					<input type="text" required ="required"
						onChange={e => setLastName(e.target.value)} />

					<label>Phone Number</label>
					<input type="text" required ="required"
						onChange={e => setPhoneNumber(e.target.value)} />

					<label>PIN</label>
					<input type="text" required ="required"
						onChange={e => setPin(e.target.value)} />

					<label id="checkbox">
						<input type="checkbox" name="remember"
							defaultChecked={checked}
							onChange={() => setChecked(!checked) } />
						I agree the terms and conditions
					</label>
					<button class="button" type="submit">SUBMIT</button>
				</form>
				<p> Already have an account? <a href="/">Login here</a></p>
			</div>
		</div>
	</>
	)
}