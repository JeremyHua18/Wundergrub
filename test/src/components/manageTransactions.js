import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class manageTransactions extends Component {
    render() {
        return (
            <div className="manageTransactions">
                <h5><Link className = "link" to="/home">Home</Link> -> Manage Transactions</h5>
                <h2>Manage Transactions</h2>
                <h4>to implement later</h4>
                <Link className="link"to="/home">return home</Link>
            </div>
        );
    }
}

export default manageTransactions;