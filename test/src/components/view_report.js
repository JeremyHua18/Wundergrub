import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class view_report extends Component {
	render() {
		return (
			<div className="report">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Report</h2>
				<h4>You have no availabe report now.</h4>
				<Link className="link"to="/home">return home</Link>
							<div class="image"></div>

			</div>
		);
	}
}

export default view_report;
