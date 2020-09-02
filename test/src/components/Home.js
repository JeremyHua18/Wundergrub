import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
	render() {
		return (
			<div className="home">
				<form onSubmit={this.displayLogin}>
					<h2>Home</h2>
					<h4>Welcome back to WUNDERgrubs</h4>
					<Link className="linkhomepg"to="/newtrans">new transaction</Link>
					<Link className="linkhomepg"to="/transhistory">transaction history</Link>
					<Link className="linkhomepg"to="/viewreport">view report</Link>
					<Link className="linkhomepg"to="/account">manage account</Link>
					<Link className="linkhomepg"to="/help">help center</Link>

				</form>

				<Link className="link" to="/Logout">Logout Here</Link>
			</div>
		);
	}
}

export default Home;