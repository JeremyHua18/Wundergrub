import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import HarvestDataService from "../services/harvest.service"
// import * as fs from 'fs';


class newHarvest extends Component {
	constructor(props) {
		super(props);
        this.choice = ["pick up","delievery"];
		this.state = {
			date: new Date("01/00/2000"),
			userCompany: '',
            weight: 0,
            feedType: '',
			comments: ''
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
			const cookies = new Cookies();
			var data = {
				username: cookies.get('email'),
				user_company: this.state.userCompany,
				date: this.state.date,
				weight: this.state.weight,
				feed_type: this.state.feedType,
				comments: this.state.comments,
				status: 'Pending',
				edited_by: ''
			}

			HarvestDataService.create(data).then(response => {
				console.log(response.data);
				alert('Harvest successfully logged');
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
		if (typeof type === 'undefined' || typeof email === 'undefined') {
            this.props.history.push("/");
        }
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
			<div className="transaction">
				<form name = "newHarvest" onSubmit={this.submitHandler}>
				<h5><Link className = "link" to="/home">Home</Link></h5>
					<h2>Farmer Logging Harvest</h2>
					<h4>Please log your harvest data</h4>

					<div class = "divCell"></div>

					<label for="date">Date</label>
					<input type="date" name="date" id="date" onChange={this.updateHandler} required></input>

					<div class = "divCell"></div>

					<div className="User">
						<input
							type="text"
							placeholder="User/Company Name"
							name="userCompany"
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

					<div className="FeedType">
                        <input
                            type="text"
                            placeholder="Feed Type"
                            name="feedType"
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

export default newHarvest;
