import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NewTransaction extends Component {
	constructor(props) {
		super(props);
        this.choice = ["pick up","delievery"];
		this.state = {
			delievery_type: '',
			waste_type: '',
            weight: '',
            schedule:'',
            comment:''
		};

		this.update = this.update.bind(this);

		this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	displayLogin(e) {
		e.preventDefault();
		console.log('You have successfully registered');
		console.log(this.state);
		this.setState({
			fullname: '',
			email: '',
			password: ''
		});
    }

    fakeToggle(open, value, text) {
        console.log(open, value, text);
    }

	render() {
		return (
			<div className="transaction">
				<form onSubmit={this.displayLogin}>
                    <h5>Home->new transaction</h5>
					<h2>New Transaction</h2>
					<h4>Make new transaction now!</h4>
					<div className="type">
						<input
							type="text"
							placeholder="Pick up"
							name="Delivery Type"
							onChange={this.update}
						/>
					</div>

					<div className="Weight">
						<input
							type="text"
							placeholder="lbs"
							name="Weight"
							onChange={this.update}
						/>
					</div>

					<div className="Waste Type">
						<input
							type="text"
							placeholder="enter type"
							name="waste type"
							onChange={this.update}
						/>
					</div>

					<div className="comments">
                        <input 
                            type="text" 
                            placeholder="enter your comments" 
                            name="password1" />
					</div>

					<input type="submit" value="submit" />
					
				</form>

				<Link className="link"to="/home">return home</Link>
			</div>
		);
	}
}

export default NewTransaction;