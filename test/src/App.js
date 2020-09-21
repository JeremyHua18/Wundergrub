import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import NewTransaction from './components/NewTransaction';
import farmer_logging from './components/farmer_logging';
import view_report from './components/view_report';
import transaction_history from './components/transaction_history';
import manage_account from './components/manage_account';
import help from './components/help';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/newtrans" component={NewTransaction} />
        <Route path="/farmerLogging" component={farmer_logging} />
        <Route path="/transhistory" component={transaction_history} />
        <Route path="/viewreport" component={view_report} />
        <Route path="/account" component={manage_account} />
        <Route path="/help" component={help} />



      </div>
    );
  }
}

export default App;
