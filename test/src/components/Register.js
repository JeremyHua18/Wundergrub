import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);

		this.okNAme = false;
		this.okEmail = false;
		this.okPass = false;
		this.okComfirm = false;

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
				this.okComfirm = false;
			} else {
				document.getElementById("unconfirmedPassword").innerHTML = "";
				this.okComfirm = true;
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
					this.okPass = false;
				} else if (!validator2.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must contain a lowercase letter.";
					this.okPass = false;
				} else if (!validator3.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must contain an uppercase letter.";
					this.okPass = false;
				} else if (!validator4.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must contain a number.";
					this.okPass = false;
				} else if (!validator5.validate(value)) {
					document.getElementById("invalidPassword").innerHTML =
						"Password must not contain space.";
					this.okPass = false;
				} else {
					document.getElementById("invalidPassword").innerHTML = "";
					this.okPass = true;
				}
				this.setState({
					[name]: value
				});
			} else if (name === "email") {
				const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
				if(! expression.test(String(value).toLowerCase())) {
					document.getElementById("invalidEmail").innerHTML =
						"Your E-mail address is not valid.";
					this.okPass = false;
				} else {
					document.getElementById("invalidEmail").innerHTML = "";
					this.okPass = true;
				}
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
						<div id="invalidEmail" className="registrationError"></div>
					</div>

					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.update}
						/>
						<div id="invalidPassword" className="registrationError"></div>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Confirm Password"
							name="password1"
							onChange={this.update}
						/>
						<div id="unconfirmedPassword" className="registrationError"></div>
					</div>

					<input type="submit" value="submit" />
					
				</form>

				<Link className="link"to="/">Login Here</Link>
			</div>
		);
	}
}

export default Register;
