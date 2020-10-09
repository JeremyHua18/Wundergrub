import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class manageHarvests extends Component {
    render() {
        return (
            <div className="manageHarvests">
                <h5><Link className = "link" to="/home">Home</Link> -> Manage Harvests</h5>
                <h2>Manage Harvests</h2>
                <h4>to implement later</h4>
                <Link className="link"to="/home">return home</Link>
            </div>
        );
    }
}

export default manageHarvests;