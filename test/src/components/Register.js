import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
			fullname: '',
			email: '',
			password: ''
			}
		};

		this.update = this.update.bind(this);

		this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		const { user } = this.state;
		this.setState({
			[name]: value
		});
	}

	handleClick(e) {
		console.log('You have successfully registered');
		// localStorage.setItem('regEmail', this.state.email);
		// localStorage.setItem('regPassword', this.state.password);
		//localStorage.setItem(this.state.fullname, this.state.fullname);
		localStorage.setItem(this.state.email, this.state.password);
	}


	displayLogin(e) {
		e.preventDefault();
		console.log(this.state);
		this.setState({
			fullname: '',
			email: '',
			password: ''
		});
	}

	render() {
		return (
			<div className="register">
				<form onSubmit={this.displayLogin}>
					<h2>Register</h2>
					<h4>Join WUNDERgrubs today!</h4>

					<div className="name">
						<input
							type="text"
							placeholder="Full Name"
							name="fullname"
							value={this.state.fullname}
							onChange={this.update}
						/>
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={this.update}
						/>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.update}
						/>
					</div>

					<div className="password">
						<input type="password" placeholder="Confirm Password" name="password1"
/>
					</div>

					<button onClick = {this.handleClick.bind(this)} ref={(button) => this.button = button} > Submit </button>
					
				</form>

				<Link className="link"to="/">Login Here</Link>
			</div>
		);
	}


}

export default Register;
