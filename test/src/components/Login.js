import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";



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
		//if (this.state.email === localStorage.getItem('regEmail') & this.state.password === localStorage.getItem('regPassword')) {
		if (this.state.password === localStorage.getItem(this.state.email)) {
			console.log('You are logged in');
			this.props.history.push("/home");
		} else {
			console.log('email or password is wrong');
		}
	}


	displayLogin(e) {
		e.preventDefault();
		console.log(this.state);
		this.setState({
			email: '',
			password: ''
		});
	}

	render() {
		return (
			<div className="login">

				<form onSubmit={this.displayLogin}>
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
