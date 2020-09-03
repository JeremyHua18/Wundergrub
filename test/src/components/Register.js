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
				document.getElementById("unconfirmedPassword").innerHTML = "Passwords do not match!";
			} else {
				document.getElementById("unconfirmedPassword").innerHTML = "";
			}
		} else {
			if (name === "password") {
				var passwordValidator = require('password-validator');
				var validator1 = new passwordValidator().is().min(6).is().max(50);
				var validator2 = new passwordValidator().has().lowercase();
				var validator3 = new passwordValidator().has().uppercase();
				var validator4 = new passwordValidator().has().digits();
				var validator5 = new passwordValidator().has().not().spaces();
				if (!validator1.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password length must be greater than 6 and less than 50.";
				} else if (!validator2.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must contain a lowercase letter.";
				} else if (!validator3.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must contain an uppercase letter.";
				} else if (!validator4.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must contain a number.";
				} else if (!validator5.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must not contain space.";
				} else {
					document.getElementById("invalidPassword").innerHTML = "";
				}
				this.setState({
					[name]: value
				});
			} else {
				this.setState({
					[name]: value
				});
			}

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
						<div id="invalidPassword"></div>
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
