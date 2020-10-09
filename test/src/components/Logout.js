import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Logout extends Component {
	render() {
		return (

        <div className="logout">
            <form onSubmit={this.displayLogin}>
                <h2>You have successfully logged out.</h2>

                <Link className="linkhomepg"to="/">Going back to login page.</Link>
		<div class="image"></div>



            </form>

        </div>
            
            

		);
	}
}

export default Logout;
