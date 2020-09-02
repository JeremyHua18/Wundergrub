import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class manage_account extends Component {
	render() {
		return (
			<div className="account">
                <h5>Home->manage account</h5>
                <h2>Manage Account</h2>
				<h4>to implement later</h4>
				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

export default manage_account;