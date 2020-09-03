import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullname: '',
			email: '',
			password: ''
		};

		this.update = this.update.bind(this);

		this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		if (name === "password1") {
			let password = this.state.password;
			if (value !== password) {
				document.getElementById("unconfirmedPassword").innerHTML = "Passwords do not match!"
			} else {
				document.getElementById("unconfirmedPassword").innerHTML = ""
			}
		} else {
			if (name === "password") {
				var passwordValidator = require('password-validator');
				var validator = new passwordValidator();
				validator
					.is().min(6)
					.has().lowercase()
					.has().uppercase()
					.has().digits()
					.has().not().spaces()
					.has().oneOf(["!", "?", "@", "#", "$", "%", "^", "&", "*", "(", ")"]);

			}
			this.setState({
				[name]: value
			});
		}
	}

	displayLogin(e) {
		e.preventDefault();
		console.log('You have successfully registered');
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
						<input
							type="password"
							placeholder="Confirm Password"
							name="password1"
							onChange={this.update}
						/>
						<div id="unconfirmedPassword"></div>
					</div>

					<input type="submit" value="submit" />
					
				</form>

				<Link className="link"to="/">Login Here</Link>
			</div>
		);
	}
}

export default Register;
