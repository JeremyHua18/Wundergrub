import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


class transaction_history extends Component {
	render() {
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
			<div className="transaction">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Transaction History</h2>
				<h4>You have no transaction now.</h4>
				<Link className="link"to="/home">return home</Link>
							<div class="image"></div>

			</div>
		);
	}
}

export default transaction_history;
