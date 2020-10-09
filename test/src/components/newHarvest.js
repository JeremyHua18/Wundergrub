import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import * as fs from 'fs';


class newHarvest extends Component {
	constructor(props) {
		super(props);
        this.choice = ["pick up","delievery"];
		this.state = {
			user: '',
			wasteType: '',
            weight: 0,
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
		let weight = this.state.weight;
		var dataForm = document.getElementsByName('newHarvest')[0];
		if (!Number(weight)) {
			alert("Weight must be a number");
		} else {
			const fs = require('browserify-fs')
			// const path = require('path');
			// const filePath = path.join(__dirname, '/output.json');
			// console.log(filePath);
			console.log( __dirname);
			var data = JSON.stringify(this.state);
			fs.writeFile("./myoutput2.json", data,
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
				<form name = "newHarvest" onSubmit={this.submitHandler}>
				<h5><Link className = "link" to="/home">Home</Link></h5>
					<h2>Farmer Logging Harvest</h2>
					<h4>Please load your harvest data</h4>

					<div class = "divCell"></div>

					<label for="dateofpickup">Pick Up Date</label>
					<input type="date" name="dateofpickup" id="dateofpickup"></input>

					<div class = "divCell"></div>
					
					<div className="User">
						<input
							type="text"
							placeholder="User/Company Name"
							name="user"
							onChange={this.updateHandler}
							required
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

export default newHarvest;
