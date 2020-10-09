import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class viewAnnouncements extends Component {
    render() {
        return (
            <div className="viewAnnouncements">
                <h5><Link className = "link" to="/home">Home</Link> -> View Announcements</h5>
                <h2>View Announcements</h2>
                <h4>to implement later</h4>
                <Link className="link"to="/home">return home</Link>
            </div>
        );
    }
}

export default viewAnnouncements;