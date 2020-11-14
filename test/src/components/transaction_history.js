import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import TransactionDataService from "../services/transaction.service";


class transaction_history extends Component {

	constructor(props) {
		const cookies = new Cookies();
		var email = cookies.get('email');
        super(props);
        this.state = {
            transactions:[],
            id:'',
            username: '',
            date: new Date(),
            delivery_type: '',
            donor_type: '',
            frequency: '',
            weight: 0,
            waste_type: '',
            comments: '',
            status: ''
        };
        var allInfo = TransactionDataService.getHistory(email);
        var self = this;
        allInfo.then(function(result) {

            for (var i = 0; i < result.data.length; i++){
                // console.log(result.data[i]);
                var temp = self.state.transactions;
                temp.push(result.data[i]);
                self.setState({transactions: temp});
            }
        })
        console.log(this);

    }

    handleOpen(transaction){
        this.setState({
            id: transaction.id,
            username: transaction.username,
            date: transaction.date,
            delivery_type: transaction.delivery_type,
            donor_type: transaction.donor_type,
            frequency: transaction.frequency,
            weight: transaction.weight,
            waste_type: transaction.waste_type,
            comments: transaction.comments,
            status: transaction.status
        });
        var details = document.getElementById("details");
        details.style.display = "block";
    }

    handleClose() {
        var details = document.getElementById("details");
        this.setState({editing: false});
        details.style.display = "none";
    }

    update(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    }

	renderTableData(){
        return this.state.transactions.map((transaction, index) => {
            const {id, username, date, delivery_type, donor_type, frequency, weight, waste_type, comments, status} = transaction;
            return (
                <tr key={id}>
                   <td>{id}</td>
                   <td>{date}</td>
                   <td> <button class="button button1" onClick = {() => this.handleOpen(transaction)}>Details</button> </td>
                </tr>
             )
        })
    }

    renderTransaction() {
        if (typeof type === 'undefined' || typeof email === 'undefined') {
            this.props.history.push("/");
        }
        if (type === '' || email === '') {
            this.props.history.push("/");
        }
        return (
            <div id="details" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h2>Transaction</h2>
                  <span class="close" onClick = {() => this.handleClose()}>&times;</span>
                </div>
                <div class="modal-body">
                  <p name="date">Date: {this.state.date.toString()}</p>
                  <p name="username">User: {this.state.username}</p>
                  {this.renderBody()}
                  <p name="comments">Comments: {this.state.comments}</p>
                </div>
              </div>
            </div>
        );
    }

    renderBody() {
        return(
            <div>
            	<p name="status">Waste Type: {this.state.status}</p>
                <p name="delivery_type">Delivery Type: {this.state.delivery_type}</p>
                <p name="donor_type">Donor Type: {this.state.donor_type}</p>
                <p name="frequency">Frequency: {this.state.frequency}</p>
                <p name="weight">Weight: {this.state.weight}</p>
                <p name="waste_type">Waste Type: {this.state.waste_type}</p>
            </div>
        );
    }

	render() {
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
            <div className="manageTransactions">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Transaction History</h2>
                {this.renderTransaction()}
                <table id='transactions'>
                  <tr>
                     <th>ID</th>
                     <th>Date</th>
                     <th>Transaction Details</th>
                  </tr>
                  <tbody>
                     {this.renderTableData()}
                  </tbody>
               </table>
                <Link className="link"to="/home">return home</Link>
            </div>
        );
	}
}

export default transaction_history;
