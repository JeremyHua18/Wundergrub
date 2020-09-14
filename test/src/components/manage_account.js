import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class manage_account extends Component {


	deleteAccount(e) {
		if (localStorage.getItem('userEmail') != null) {
			localStorage.clear();
			//console.log('account has been deleted');
			window.location.reload(false);
		} else {
			this.button.disabled = false;
		}
		
	}
	

	render() {
		const { user} = this.props;
		return (
			<div className="account">
                <h5>Home->manage account</h5>
                <h2>Manage Account</h2>
				<h4>Current Account: {localStorage.getItem('userEmail')} </h4>		
				<button onClick = {this.deleteAccount.bind(this)} ref={(button) => this.button = button} >Delete My Account </button>
		
				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

// function deleteAccount() {
// 	if ('' == localStorage.getItem('userEmail')) {
// 		localStorage.clear();
// 		//console.log('account has been deleted');
// 		window.location.reload(false);
// 	} else {
// 		this.button.disabled = true;
// 	}	
// }


export default manage_account;
