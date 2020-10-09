import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import * as fs from 'fs';


class NewTransaction extends Component {
	constructor(props) {
		super(props);
        this.choice = ["pick up","delievery"];
		this.state = {
			delieveryType: '',
			userType: '',
			wasteType: '',
            weight: 0,
            schedule: '',
			comment: '',
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
		if (!Number(weight)) {
			alert("Weight must be a number");
		} else {
			const fs = require('browserify-fs')
			// const path = require('path');
			// const filePath = path.join(__dirname, '/output.json');
			// console.log(filePath);
			console.log( __dirname);
			var data = JSON.stringify(this.state);
			fs.writeFile("./myoutput1.json", data,
			(err) => { 
				if (err) throw err; 
				console.log('Data written to file');
				alert("Data is successfully logged")
				// frm.submit()
				dataForm.reset() 
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
		return (
			
			<div className="transaction">
				<form name = "newTrans"onSubmit={this.submitHandler}>
				<h5><Link className = "link" to="/home">Home</Link></h5>
					<h2>New Transaction</h2>
					<h4>Make new transaction now!</h4>

					<div class = "divCell"></div>

					<label for="dateofpickup">Pick Up Date</label>
					<input type="date" name="dateofpickup" id="dateofpickup"></input>

					<div class = "divCell"></div>


					<div class="custom-select">
						<select>
							<option>Delievery Type</option>
							<option>Pick up</option>
    						<option>Delivery</option>
						</select>
					</div>

					<div class = "divCell"></div>

					<div class="custom-select">
						<select>
							<option>User Type</option>
							<option>Donator</option>
    						<option>Subscriber</option>
						</select>
					</div>

					<div class = "divCell"></div>


					<div className="schedule">
						<input
							type="text"
							placeholder="For Subscribers: Please Enter Frequency"
							name="schedule"
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
                            name="comment" />
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
