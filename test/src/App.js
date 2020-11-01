import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import Home from './components/Home';
import Admin from "./components/Admin";
import NewTransaction from './components/NewTransaction';
import newHarvest from './components/newHarvest';
import view_report from './components/view_report';
import transaction_history from './components/transaction_history';
import manage_account from './components/manage_account';
import help from './components/help';
import annoucement from './components/announcement';
import ResetPassword from './components/resetPassword';
import manageHarvests from './components/manageHarvests';
import manageTransactions from './components/manageTransactions';
import viewAnnouncements from './components/viewAnnouncements';
import Landing from "./components/landing";
import './App.css';
import './Style.css'

class App extends Component {
  render() {
    return (
      <div class = 'app'>
        <div class="Landing">
          <Route exact path="/" component={Landing}/>
        </div>
        <div class = "container"> 
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/newtrans" component={NewTransaction} />
          <Route path="/newHarvest" component={newHarvest} />
          <Route path="/transhistory" component={transaction_history} />
          <Route path="/viewreport" component={view_report} />
          <Route path="/account" component={manage_account} />
          <Route path="/help" component={help} />
          <Route path="/annoucement" component={annoucement} />
          <Route path="/admin" component={Admin}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/resetpassword" component={ResetPassword}/>
          <Route path="/manageHarvests" component={manageHarvests}/>
          <Route path="/manageTransactions" component={manageTransactions}/>
          <Route path="/viewAnnouncements" component={viewAnnouncements}/>
        </div>
      </div>
    );
  }
}

export default App;





