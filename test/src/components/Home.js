import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


class Home extends Component {
	renderAdmin() {
		return(
		<div>
		<Link className="linkhomepg"to="/admin">Edit Users</Link>
		<Link className="linkhomepg"to="/manageTransactions">Manage Transactions</Link>
		<Link className="linkhomepg"to="/manageHarvests">Manage Harvests</Link>
		</div>
		)
	}

    renderInternal() {
        return(
        <div>
        <Link className="linkhomepg"to="/manageTransactions">Manage Transactions</Link>
        <Link className="linkhomepg"to="/manageHarvests">Manage Harvests</Link>
        </div>
        )
    }

	render() {
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
        if (typeof type === 'undefined' || typeof email === 'undefined') {
            this.props.history.push("/");
        }
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
			<div className="home">
				<form onSubmit={this.displayLogin}>
					<h2>Home</h2>
					<h4>Welcome back to WUNDERgrubs</h4>
					<Link className="linkhomepg"to="/viewAnnouncements">View Announcements</Link>
					{(type === 'admin') &&
						this.renderAdmin()
					}
                    {(type === 'internal') &&
                        this.renderInternal()
                    }
					<Link className="linkhomepg"to="/newtrans">New Transaction</Link>
					<Link className="linkhomepg"to="/newHarvest">New Harvest</Link>
					<Link className="linkhomepg"to="/transhistory">Transaction History</Link>
					<Link className="linkhomepg"to="/viewreport">View Reports</Link>
					<Link className="linkhomepg"to="/account">Manage Account</Link>
					<Link className="linkhomepg"to="/help">Help Center</Link>

				</form>

				<Link className="link" to="/Logout">Logout Here</Link>
				<div class="image"></div>

			</div>
		);
	}
}

export default Home;