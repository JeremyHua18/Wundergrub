import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
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
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
			<div className="transaction">
				<form name = "newTrans"onSubmit={this.submitHandler}>
				<h5><Link className = "link" to="/home">Home</Link> -> New Transaction</h5>
					<h2>New Transaction</h2>
					<h4>Make new transaction now!</h4>
					<div className="type">
						<lable> Delivery Type: </lable>
						<input type="radio" id="pickup" value="Pick up" name="delieveryType" onChange={this.updateHandler} />
						<label for="pickup"> Pick up </label>
						<input type="radio" id="del" value="Delivery" name="delieveryType" onChange={this.updateHandler} />
						<label for="del"> Delivery </label>
					</div>

					<div className="userType">
						<lable> User Type: </lable>
						<input type="radio" id="Donator" value="Donator" name="userType" onChange={this.updateHandler}/>
						<label for="Donator"> Donator </label>
						<input type="radio" id="Sub" value="Subscriber" name="userType" onChange={this.updateHandler}/>
						<label for="Sub"> Subscriber </label>
					</div>

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
			</div>
		);
	}
}

export default NewTransaction;