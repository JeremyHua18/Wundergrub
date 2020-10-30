import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import HarvestDataService from "../services/harvest.service";
import WonderEmail from "../emailer/WonderEmail";
import TransactionDataService from "../services/transaction.service";


class manageHarvests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            harvests:[],
            id:'',
            username: '',
            user_company: '',
            date: new Date(),
            weight: 0,
            feed_type: '',
            comments: '',
            editing: false
        };
        var allInfo = HarvestDataService.getPending();
        var self = this;
        allInfo.then(function(result) {

            for (var i = 0; i < result.data.length; i++){
                // console.log(result.data[i]);
                var temp = self.state.harvests;
                temp.push(result.data[i]);
                self.setState({harvests: temp});
            }
        })
        console.log(this);

    }

    handleOpen(harvest){
        this.setState({
            id: harvest.id,
            username: harvest.username,
            user_company: harvest.user_company,
            date: harvest.date,
            weight: harvest.weight,
            feed_type: harvest.feed_type,
            comments: harvest.comments
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
            HarvestDataService.update(this.state.id, data).then(response => {
                console.log(response.data);
                alert('Harvest has been approved');
                window.location.reload(false);
            }).catch(e => {
                alert('Something went wrong. Please try again');
                console.log(e)
            });
        } else {
            var result = HarvestDataService.get(this.state.id);
            var self = this;
            result.then( function(result_data) {
                var unedited = result_data.data;
                var data = {
                    weight: self.state.weight,
                    feed_type: self.state.feed_type,
                    status: 'Approved',
                    edited_by: username
                }
                console.log(data);
                unedited.username = self.state.username;
                var email = {
                    old_data: unedited,
                    new_data: data
                }
                HarvestDataService.update(self.state.id, data).then(response => {
                    console.log(response.data);
                    WonderEmail.sendNotificationForEditHarvest(email);
                    alert('Harvest has been approved');
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
        HarvestDataService.update(this.state.id, data).then(response => {
            console.log(response.data);
            WonderEmail.sendNotificationForDenyHarvest(email);
            alert('Harvest has been declined');
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
        return this.state.harvests.map((harvest, index) => {
            const {id, username, user_company, date, weight, feed_type, comments, status} = harvest;
            return (
                <tr key={id}>
                   <td>{id}</td>
                   <td>{date}</td>
                   <td>{username}</td>
                   <td> <button class="button button1" onClick = {() => this.handleOpen(harvest)}>Details</button> </td>
                </tr>
             )
        })
    }

    renderHarvest() {
        return (
            <div id="details" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h2>Harvest</h2>
                  <button class="button button2" onClick = {() => this.handleEdit()}>Edit</button>
                  <span class="close" onClick = {() => this.handleClose()}>&times;</span>
                </div>
                <div class="modal-body">
                  <p name="date">Date: {this.state.date.toString()}</p>
                  <p name="username">Username: {this.state.username}</p>
                  <p name="user_company">User/Company: {this.state.user_company}</p>
                  {!this.state.editing &&
                    this.renderBody()
                  }
                  {this.state.editing &&
                    this.renderEdits()
                  }
                  <p name="comments">Comments: {this.state.comments}</p>
                <div>
                    <button class="button3" onClick = {() => this.handleApprove()}>Approve</button>
                    <button class="button3" onClick = {() => {if (window.confirm("Decline this harvest?")) {this.handleDecline()};}}>Decline</button>
                </div>
                </div>
              </div>
            </div>
        );
    }

    renderBody() {
        return(
            <div>
                <p name="weight">Weight: {this.state.weight}</p>
                <p name="feed_type">Waste Type: {this.state.feed_type}</p>
            </div>
        );
    }

    renderEdits() {
        return(
            <div>
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
                    <label for="feed_type">Waste Type: </label>
                    <input
                        type="edit"
                        defaultValue= {this.state.feed_type}
                        name="feed_type"
                        onChange={(e) => this.update(e)}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="manageHarvests">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Manage Harvests</h2>
                {this.renderHarvest()}
                <table id='users'>
                  <tr>
                     <th>ID</th>
                     <th>Date</th>
                     <th>Username</th>
                     <th>Harvest Details</th>
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

export default manageHarvests;