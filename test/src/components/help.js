import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class help extends Component {
	render() {
		return (
			<div className="help">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Help Center</h2>
				<h4>to implement later</h4>
				<Link className="link"to="/home">return home</Link>
				<div class="image"></div>

			</div>
		);
	}
}

export default help;
