import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class manage_account extends Component {
	render() {
		const { user} = this.props;
		return (
			<div className="account">
                <h5>Home->manage account</h5>
                <h2>Manage Account</h2>
				<h4>Current Account: {localStorage.getItem('userEmail')} </h4>				
				<button onClick = {deleteAccount} >Delete My Account</button>
				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

function deleteAccount() {
	localStorage.clear();
	//console.log('account has been deleted');
	window.location.reload(false);
}

export default manage_account;
