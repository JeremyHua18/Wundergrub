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
import ResetPassword from './components/resetPassword';
import manageHarvests from './components/manageHarvests';
import manageTransactions from './components/manageTransactions';
import viewAnnouncements from './components/viewAnnouncements';
// import LandingPage from './landingpage';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/newtrans" component={NewTransaction} />
        <Route path="/newHarvest" component={newHarvest} />
        <Route path="/transhistory" component={transaction_history} />
        <Route path="/viewreport" component={view_report} />
        <Route path="/account" component={manage_account} />
        <Route path="/help" component={help} />

        <Route path="/admin" component={Admin}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/resetpassword" component={ResetPassword}/>
        <Route path="/manageHarvests" component={manageHarvests}/>
        <Route path="/manageTransactions" component={manageTransactions}/>
        <Route path="/viewAnnouncements" component={viewAnnouncements}/>
      </div>
    );
  }
}


export default function App() {
  return (
    <div class="main" id="body">
      <Header />
      <Card
        className="section"
        // img="./Capture1.PNG"
        title="About the Company"
        description= "It all started when Akissi and Karim watched an episode of Anthony
         Bourdain: No Reservations | Haiti and saw communities still experiencing food 
         insecurity years after the catastrophic earthquake in 2010, resulting in unusable 
         able land for agriculture, and thought, what can be grown that requires no water, 
         little land and feed, but also provides the protein building blocks humans need? Voila!
          Our belief that an insect-centric agriculture and food system integrated 
          with smart technology will help restore our environment, boost animal health,
           and promote healthier communities has helped make this crazy dream a reality"
      />

      <Card
        className="section bg-grey"
        // img="./Capture3.PNG"
        title="Our Values"
        description="We envision an insect-centric food system that 
        empowers communities, restores and regenerates natural resources, 
        and promotes thriving economies. In this new world, protein is accessible and everyone eats!"
      />

      <Card
        className="section"
        // img="./Capture1.PNG"
        title="Our Mission"
        description="We're on a mission to feed over 1 million people in the Southeast 
        Region with the production of our nutritious, affordable and tasty protein
         enriched food products by 2030 using our sustainably farmed edible insects.
        This sustainable production using precision farming techniques will also help 
        restore our natural resources and regenerate our soil for future growth.  
        So what you eat is not only good for you, but the planet too!"
      />
      <Card className='example1'></Card>
    </div>
  );
}

const Header = () => {
  return (
    <div className="header">
      <div class="topnav">
        <a class="active" href="Home">
          Login/Register
        </a>
        <a href="view_report">Report</a>
        <a href="#contact">Why WUNDERGRUBS</a>
        <a href="#about">Our Services</a>
      </div>
      <div class="logo"></div>
      <br />
    </div>
  );
};

const Card = (props) => {
  return (
    <div className={props.className}>
      <div className="small-div">
        <i className={props.className}></i>
        <img src={props.img} alt="" />
      </div>

      <div className="big-div">
        <span className="div-title">{props.title}</span>
        <br />
        <span>{props.description}</span>
      </div>
    </div>
  );
};




