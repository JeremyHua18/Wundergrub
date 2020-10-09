import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


class Logout extends Component {
	render() {
		const cookies = new Cookies();
		cookies.set('email', '', { path: '/' });
		cookies.set('type', '', { path: '/' });
		return (

        <div className="logout">
            <form onSubmit={this.displayLogin}>
                <h2>You have successfully logged out.</h2>

                <Link className="linkhomepg"to="/">Going back to login page.</Link>


            </form>

        </div>
            
            

		);
	}
}

export default Logout;