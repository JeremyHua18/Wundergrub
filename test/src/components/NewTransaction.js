import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import TransactionDataService from "../services/transaction.service"
// import * as fs from 'fs';


class NewTransaction extends Component {
	constructor(props) {
		super(props);
        this.choice = ["pick up","delievery"];
		this.state = {
			pickup_date: new Date("01/00/2000"),
			delieveryType: 'Delivery Type',
			userType: 'User Type',
			frequency: '',
            weight: 0,
			wasteType: '',
			comments: '',
		};

		this.updateHandler = this.updateHandler.bind(this);

		this.submitHandler = this.submitHandler.bind(this);
	}

	updateHandler(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({[name]: value});
	}

	submitHandler(e) {
		var dataForm = document.getElementsByName('newTrans')[0];
		let weight = this.state.weight;
		let delieveryType = this.state.delieveryType;
		let userType = this.state.userType;
		if (delieveryType === "Delivery Type") {
			alert("Please select a delivery type");
		} else if (userType === "User Type") {
			alert("Please select a user type");
		} else if (!Number(weight)) {
			alert("Weight must be a number");
		} else {
			const fs = require('browserify-fs')
			// const path = require('path');
			// const filePath = path.join(__dirname, '/output.json');
			// console.log(filePath);
			console.log( __dirname);
			const cookies = new Cookies();
			var data = {
				username: cookies.get('email'),
				date: this.state.pickup_date,
				delivery_type: this.state.delieveryType,
				donor_type: this.state.userType,
				frequency: this.state.frequency,
				weight: this.state.weight,
				waste_type: this.state.wasteType,
				comments: this.state.comments,
				status: 'Pending'
			}

			TransactionDataService.create(data).then(response => {
				console.log(response.data);
				alert('Transaction successfully logged');
				dataForm.reset();
			}).catch(e => {
				console.log(e)
			});
		}
		console.log(this.state)
		console.log("json: " + data);
		e.preventDefault();
    }

    fakeToggle(open, value, text) {
        console.log(open, value, text);
	}



	render() {
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (

			<div className="transaction">
				<form name = "newTrans"onSubmit={this.submitHandler}>
				<h5><Link className = "link" to="/home">Home</Link></h5>
					<h2>New Transaction</h2>
					<h4>Make a new transaction</h4>

					<div class = "divCell"></div>

					<label for="pickup_date">Pick Up Date</label>
					<input type="date" name="pickup_date" id="pickup_date" onChange={this.updateHandler} required></input>

					<div class = "divCell"></div>
						<select name="delieveryType" onChange={this.updateHandler}>
							<option value="Delivery Type">Delievery Type</option>
							<option value="Pick Up">Pick up</option>
    						<option value = "Delivery">Delivery</option>

						</select>
						{this.state.errormessage}

					<div class = "divCell"></div>
						<select name="userType" onChange={this.updateHandler}>
							<option value="User Type">User Type</option>
							<option value="Donator">Donator</option>
    						<option value="Subscriber">Subscriber</option>
						</select>
						{this.state.errormessage}

					<div class = "divCell"></div>


					<div className="schedule">
						<input
							type="text"
							placeholder="For Subscribers: Please Enter Frequency"
							name="frequency"
							onChange={this.updateHandler}
						/>
					</div>


					<div className="Weight">
						<input
							type="text"
							placeholder="Weight (lbs)"
							name="weight"
							onChange={this.updateHandler}
							required
						/>
						{this.state.errormessage}
					</div>

					<div className="WasteType">
						<input
							type="text"
							placeholder="Waste Type"
							name="wasteType"
							onChange={this.updateHandler}
							required
						/>
					</div>

					<div className="comments">
                        <input
                            type="text"
                            placeholder="Comments"
                            name="comments"
                            onChange={this.updateHandler}
                           />
					</div>

					<input type="submit" value="Submit" />
					<input type="reset" value="Cancel" />
				</form>

				<Link className="link"to="/home">return home</Link>
				<div class="image"></div>

			</div>
		);
	}
}

export default NewTransaction;
