import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
	render() {
		return (
			<div className="home">
				<form onSubmit={this.displayLogin}>
					<h2>Home</h2>
					<h4>Welcome back to WUNDERgrubs</h4>
					<Link className="linkhomepg"to="/newtrans">New transaction</Link>
					<Link className="linkhomepg"to="/farmerLogging">Farmer Logging Harvest</Link>
					<Link className="linkhomepg"to="/transhistory">Transaction history</Link>
					<Link className="linkhomepg"to="/viewreport">View report</Link>
					<Link className="linkhomepg"to="/account">Manage account</Link>
					<Link className="linkhomepg"to="/help">Help center</Link>

				</form>

				<Link className="link" to="/Logout">Logout Here</Link>
			</div>
		);
	}
}

export default Home;