import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class view_report extends Component {
	render() {
		return (
			<div className="report">
                 <h5>Home->view report</h5>
                <h2>Report</h2>
				<h4>You have no availabe report now.</h4>
				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

export default view_report;