import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import UserDataService from "../services/user.service";



class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.update = this.update.bind(this);
		this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
        const { name, value } = e.target;
		this.setState({ [name]: value });
		localStorage.setItem('loginEmail', this.state.email);
	}

	
	handleClick(e) {
		e.preventDefault();
		var row = UserDataService.get(this.state.email);
		var inputpass = this.state.password;
		console.log("Get in the function");
		row.then(function(result){
			console.log("Data get");
			if (result.data === '') {
				alert("Account does not exist!");
			} else {
				var hashed = result.data.password;
				var passwordHash = require('password-hash');
				if (passwordHash.verify(inputpass, hashed)) {
					console.log('You are logged in');
				} else {
					alert("Your password is incorrect.");
				}
			}
			console.log(result.data);
		});
	}


	displayLogin(e) {
		e.preventDefault();

	}

	render() {
		return (
			<div className="login">

				<form >
					<h2>Login</h2>
					<h3>Welcome to WUNDERgrubs</h3>
					<div className="username">
						<input
							type="text"
							placeholder="Email..."
							value={this.state.email}
							onChange={this.update}
							name="email"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
					</div>

					<button onClick = {this.handleClick.bind(this)} ref={(button) => this.button = button} > Login </button>
				</form>
				
				<Link className="link" to="/register">Create an account</Link>				

			</div>
		);
	}

}



export default withRouter(Login);
