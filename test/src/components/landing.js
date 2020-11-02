import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserDataService from "../services/user.service"
import help from "./help";
import Login from './Login';
import Register from './Register';
import Home from './Home';
import view_report from './view_report';



class Landing extends Component {
    render() {
        const Header = () => {
            return (
                <div className="header">
                <div class="topnav">
                <a class="active" href="Login"> Login</a>
                <a href="Register">Register</a>
                <a href="viewreport">Report</a>
                <a href="Home">Why WUNDERGRUBS</a>
                <a href="Home">Our Services</a>
                <a href="Home">Home</a>
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
        return (
            <div class="main" id="body">
            <Header />
            <Card className="section"
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

            <Card className="section bg-grey"
            title="Our Values"
            description="We envision an insect-centric food system that
            empowers communities, restores and regenerates natural resources,
                and promotes thriving economies. In this new world, protein is accessible and everyone eats!"
            />

            <Card className="section"
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
}

export default Landing;