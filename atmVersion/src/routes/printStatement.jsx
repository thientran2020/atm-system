import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import '../css/profile.css'

export default class PrintStatement extends Component {
	state = {}

	fetchData() {
		return fetch("/account", 
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
		}).then(data => {this.setState({ account: data })})
		
	}

	componentDidMount() {
		this.fetchData()
	}

	render() {
		const account = this.state.account
		console.log(account);
			return (
				<div></div>
			)
		}
	
	
}