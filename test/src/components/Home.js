import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
	render() {
		return (
			<div className="home">
				<form onSubmit={this.displayLogin}>
					<h2>Home</h2>
					<h4>Welcome back to WUNDERgrubs</h4>
					<Link className="linkhomepg"to="/newtrans">New Transaction</Link>
					<Link className="linkhomepg"to="/newHarvest">New Harvest</Link>
					<Link className="linkhomepg"to="/transhistory">Transaction History</Link>
					<Link className="linkhomepg"to="/viewreport">View Report</Link>
					<Link className="linkhomepg"to="/account">Manage Account</Link>
					<Link className="linkhomepg"to="/help">Help Center</Link>
					
				</form>

				<Link className="link" to="/Logout">Logout Here</Link>
			</div>
		);
	}
}

export default Home;