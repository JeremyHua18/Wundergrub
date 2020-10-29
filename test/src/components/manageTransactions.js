import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import TransactionDataService from "../services/transaction.service";
import WonderEmail from "../emailer/WonderEmail";

class manageTransactions extends Component {

    constructor(props) {
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
            editing: false
        };
        var allInfo = TransactionDataService.getPending();
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
            comments: transaction.comments
        });
        var details = document.getElementById("details");
        details.style.display = "block";
    }

    handleEdit() {
        this.setState({editing: true});
    }

    handleClose() {
        var details = document.getElementById("details");
        this.setState({editing: false});
        details.style.display = "none";
    }

    handleApprove() {
        const cookies = new Cookies();
        var username = cookies.get('email');
        if (!this.state.editing) {
            var data = {
                status: 'Approved',
                edited_by: username
            }
            TransactionDataService.update(this.state.id, data).then(response => {
                console.log(response.data);
                alert('Transaction has been approved');
                window.location.reload(false);
            }).catch(e => {
                alert('Something went wrong. Please try again');
                console.log(e)
            });
        } else {
            var result = TransactionDataService.get(this.state.id);
            var self = this;
            result.then( function(result_data) {
                var unedited = result_data.data;
                // logic checks
                if (self.state.delivery_type === "Delivery Type") {
                    self.state.delivery_type = unedited.delivery_type;
                }
                if (self.state.donor_type === "User Type") {
                    self.state.donor_type = unedited.donor_type;
                }
                if (self.state.frequency === "Frequency (Subscriber Only)") {
                    self.state.frequency = unedited.frequency;
                }
                // check to make sure donators don't have a frequency
                if (self.state.donor_type === "Donator") {
                    self.state.frequency = '';
                }
                var data = {
                    delivery_type: self.state.delivery_type,
                    donor_type: self.state.donor_type,
                    frequency: self.state.frequency,
                    weight: self.state.weight,
                    waste_type: self.state.waste_type,
                    status: 'Approved',
                    edited_by: username
                }

                unedited.username = self.state.username;
                var email = {
                    old_data: unedited,
                    new_data: data
                }
                console.log(data);
                console.log(email);
                TransactionDataService.update(self.state.id, data).then(response => {
                    console.log(response.data);
                    WonderEmail.sendNotificationForEditTransaction(email);
                    alert('Transaction has been approved');
                    window.location.reload(false);
                }).catch(e => {
                    alert('Something went wrong. Please try again');
                    console.log(e)
                });
            });
        }

    }

    handleDecline() {
        const cookies = new Cookies();
        var username = cookies.get('email');
        var data = {
            status: 'Declined',
            edited_by: username
        }
        var email = {
            address: this.state.username,
            edited_by: username,
            transaction_id: this.state.id
        }

        TransactionDataService.update(this.state.id, data).then(response => {
            console.log(response.data);
            WonderEmail.sendNotificationForDenyTransaction(email);
            alert('Transaction has been declined');
            window.location.reload(false);
        }).catch(e => {
            alert('Something went wrong. Please try again');
            console.log(e)
        });
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
                   <td>{username}</td>
                   <td> <button class="button button1" onClick = {() => this.handleOpen(transaction)}>Details</button> </td>
                </tr>
             )
        })
    }

    renderTransaction() {
        return (
            <div id="details" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h2>Transaction</h2>
                  <button class="button button2" onClick = {() => this.handleEdit()}>Edit</button>
                  <span class="close" onClick = {() => this.handleClose()}>&times;</span>
                </div>
                <div class="modal-body">
                  <p name="date">Date: {this.state.date.toString()}</p>
                  <p name="username">User: {this.state.username}</p>
                  {!this.state.editing &&
                    this.renderBody()
                  }
                  {this.state.editing &&
                    this.renderEdits()
                  }
                  <p name="comments">Comments: {this.state.comments}</p>
                <div>
                    <button class="button3" onClick = {() => this.handleApprove()}>Approve</button>
                    <button class="button3" onClick = {() => {if (window.confirm("Decline this transaction?")) {this.handleDecline()};}}>Decline</button>
                </div>
                </div>
              </div>
            </div>
        );
    }

    renderBody() {
        return(
            <div>
                <p name="delivery_type">Delivery Type: {this.state.delivery_type}</p>
                <p name="donor_type">Donor Type: {this.state.donor_type}</p>
                <p name="frequency">Frequency: {this.state.frequency}</p>
                <p name="weight">Weight: {this.state.weight}</p>
                <p name="waste_type">Waste Type: {this.state.waste_type}</p>
            </div>
        );
    }

    renderEdits() {
        return(
            <div>
                <div>
                    <label for="delivery_type">Delivery Type: </label>
                    <select class="select2" name="delivery_type" onChange={(e) => this.update(e)}>
                        <option value="Delivery Type">Delievery Type</option>
                        <option value="Pick Up">Pick Up</option>
                        <option value ="Delivery">Delivery</option>
                    </select>
                </div>
                <div>
                    <label for="user_type">User Type: </label>
                    <select class="select2" name="donor_type" onChange={(e) => this.update(e)}>
                        <option value="User Type">User Type</option>
                        <option value="Donator">Donator</option>
                        <option value="Subscriber">Subscriber</option>
                    </select>
                </div>
                <div>
                    <label for="frequency">Frequency: </label>
                    <select class="select2" name="frequency" onChange={(e) => this.update(e)}>
                        <option value="">Frequency (Subscriber Only)</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div>
                    <label for="weight">Weight: </label>
                    <input
                        type="edit"
                        defaultValue= {this.state.weight}
                        name="weight"
                        onChange={(e) => this.update(e)}
                    />
                </div>
                <div>
                    <label for="waste_type">Waste Type: </label>
                    <input
                        type="edit"
                        defaultValue= {this.state.waste_type}
                        name="waste_type"
                        onChange={(e) => this.update(e)}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="manageTransactions">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Manage Transactions</h2>
                {this.renderTransaction()}
                <table id='users'>
                  <tr>
                     <th>ID</th>
                     <th>Date</th>
                     <th>User</th>
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

export default manageTransactions;