import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import UserDataService from "../services/user.service";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        };
        var allInfo = UserDataService.getActive();
        var self = this;
        allInfo.then(function(result) {

            for (var i = 0; i < result.data.length; i++){
                // console.log(result.data[i]);
                var temp = self.state.users;
                temp.push(result.data[i]);
                self.setState({users: temp});
            }
        })
        console.log(this);

    }



    update(e) {
        this.setState();
    }


    handleApprove(username) {
        var data = {
            status: 'Approved'
        }
        UserDataService.update(username, data).then(response => {
            console.log(response.data);
            alert('User has been approved');
            window.location.reload(false);
        }).catch(e => {
            alert('Something went wrong. Please try again');
            console.log(e)
        });
    }

    handleDelete(username) {
        var data = {
            status: 'Deleted'
        }
        UserDataService.update(username, data).then(response => {
            console.log(response.data);
            alert('User has been deleted');
            window.location.reload(false);
        }).catch(e => {
            alert('Something went wrong. Please try again');
            console.log(e)
        });
    }

    handleEdit(username, type) {
        var data = {
            account_type: type
        }
        UserDataService.update(username, data).then(response => {
            console.log(response.data);
            alert('Successfully edited user');
            window.location.reload(false);
        }).catch(e => {
            alert('Something went wrong. Please try again');
            console.log(e)
        });
    }

    renderTableData() {
        return this.state.users.map((user, index) => {
            const {account_type, createdAt, fullname, password, updatedAt, username, status} = user;
            // console.log(index);
            return (
                <tr key={username}>
                   <td>{username}</td>
                   <td>{fullname}</td>
                   <td>{status}</td>
                   <td>{account_type}</td>
                   <td><button class={status == 'Approved' ? "button disabled" : "button button1"}
                        onClick = {() => {if (status == "Pending"){this.handleApprove(username)};}}>Approve</button></td>
                   <td><button class= {account_type == 'admin' ? "button disabled" : "button button1"}
                        onClick = {() => {if (account_type != 'admin'){if (window.confirm("Delete this user?")) {this.handleDelete(username)};}}}>Delete</button></td>
                   <td><div class="dropdown">
                      <button class={account_type == 'admin' ? "button disabled" : "button button1"}>Edit</button>
                      <div class={account_type == 'admin' ? "dropdown-disabled" : "dropdown-content"}>
                      <a onClick = {() => this.handleEdit(username, 'user')} href="#">Standard</a>
                      <a onClick = {() => this.handleEdit(username, 'internal')} href="#">Internal</a>
                      </div>
                   </div>
                   </td>
                   </tr>
             )
        })
    }

	render() {

        const cookies = new Cookies();
        var type = cookies.get('type');
        if (type === 'admin') {
        return (
            <div>
               <h1 id='title'>Users</h1>
               <table id='users'>
                  <tr>
                     <th>Username</th>
                     <th>Full Name</th>
                     <th>Status</th>
                     <th>Account Type</th>
                     <th>Approve User</th>
                     <th>Delete User</th>
                     <th>Edit User</th>
                  </tr>
                  <tbody>
                     {this.renderTableData()}
                  </tbody>
               </table>
               <br></br>
               <Link className="link" to="/Logout">Logout Here</Link>
            </div>
         )
        } else {
            return (<h1>404</h1>)
        }
	}
}

export default Admin;