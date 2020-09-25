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
        var allInfo = UserDataService.getAll();
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


    handleClick(ind) {
        console.log(ind);
    }

    renderTableData() {
        return this.state.users.map((user, index) => {
            const {account_type, createdAt, fullname, password, updatedAt, username} = user;
            // console.log(index);
            return (
                <tr key={username}>
                   <td>{index}</td>
                   <td>{username}</td>
                   <td>{fullname}</td> 
                   <td>{account_type}</td>
                   <td><button onClick = {this.handleClick.bind(this)}>Delete</button></td>
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
               <h1 id='title'>React Dynamic Table</h1>

               <table id='students'>
                  <tbody>
                     {this.renderTableData()}
                  </tbody>
               </table>
            </div>
         )
        } else {
            return (<h1>404</h1>)
        }
	}
}

export default Admin;