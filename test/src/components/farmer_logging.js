import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import * as fs from 'fs';


class farmer_logging extends Component {
	constructor(props) {
		super(props);
        this.choice = ["pick up","delievery"];
		this.state = {
			user: '',
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
		e.preventDefault();
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
			fs.writeFile("./myoutput.json", data,
			(err) => { 
				if (err) throw err; 
				console.log('Data written to file'); 
			});
		}
		console.log(this.state)
		console.log("json: " + data);
		
    }

    fakeToggle(open, value, text) {
        console.log(open, value, text);
    }

	render() {
		return (
			<div className="transaction">
				<form onSubmit={this.submitHandler}>
                    <h5>Home->Farmer Logging Harvest</h5>
					<h2>Farmer Logging Harvest</h2>
					<h4>Please load your harvest data</h4>
					<div className="User">
						<input
							type="text"
							placeholder="User/Company Name"
							name="user"
							onChange={this.updateHandler}
						/>
					</div>

					<div className="Weight">
						<input
							type="text"
							placeholder="Weight (lbs)"
							name="weight"
							onChange={this.updateHandler}
						/>
						{this.state.errormessage}
					</div>

					<div className="WasteType">
						<input
							type="text"
							placeholder="Waste Type"
							name="wasteType"
							onChange={this.updateHandler}
						/>
					</div>

					<div className="comments">
                        <input 
                            type="text" 
                            placeholder="Comments" 
                            name="comment" />
					</div>

					<input type="submit" value="submit" />
					
				</form>

				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

export default farmer_logging;