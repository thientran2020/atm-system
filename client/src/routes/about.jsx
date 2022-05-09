import React, { Component } from 'react'

export default class AboutUs extends Component {
	state = {}

	fetchImage() {
		return fetch(`http://localhost:4040/image?image=5d8195c6c585633aa41cdd14f863c23b`, 
		{
			method: 'GET'
		}).then(res => {this.setState({ image: res.url })})
	}

	handleSubmit(e) {
		e.preventDefault()
		console.log(this.state.image)
	}

	componentDidMount() {
		this.fetchImage()
	}

	render() {
		return (
			<div className="div-container">
				<h1>About Us</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						filename={this.state.file} 
						onChange={e => this.setState({ file: (e.target.files[0]) })} 
						type="file" 
						accept="image/*"
					></input>

					<input
						onChange={e => this.setState({ description: (e.target.files) })} 
						type="text"
					></input>

					<button type="submit">Submit</button>
				</form>
				{ this.state.image && <img src={this.state.image}/> }
			</div>
		)
	}
}