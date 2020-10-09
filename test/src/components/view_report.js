import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


class view_report extends Component {
	render() {
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
			<div className="report">
                <h5><Link className = "link" to="/home">Home</Link> -> View Report</h5>
                <h2>Report</h2>
				<h4>You have no availabe report now.</h4>
				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

export default view_report;