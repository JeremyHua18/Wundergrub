import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class manage_account extends Component {

	deleteAccount(e) {
		if (localStorage.getItem('loginEmail') != null) {
			localStorage.removeItem('loginEmail');
			console.log('account has been deleted');
			window.location.reload(false);
		} else {
			/*
			second clicking will redirect back to login page
			*/
			this.props.history.push("/");
		}
		
	}
	

	render() {
		const { user} = this.props;
		return (
			<div className="account">
                <h5>Home->manage account</h5>
                <h2>Manage Account</h2>
				<h4>Current Account: {localStorage.getItem('loginEmail')} </h4>		
				<button onClick = {this.deleteAccount.bind(this)} ref={(button) => this.button = button} >Delete My Account </button>
		
				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}


export default manage_account;
