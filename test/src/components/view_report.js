import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ReportDataService from "../services/report.service"


class view_report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reports: [],
			username: '',
			report: null
		}

		const cookies = new Cookies();
		this.state.username = cookies.get('email');

		var allReports = ReportDataService.get(this.state.username);
		var self = this;


		allReports.then(function (result) {
			for (var i = 0; i < result.data.length; i++){

				var temp = self.state.reports;
				temp.push(result.data[i]);
				self.setState({reports: temp});
			}
		});
	}

	renderTableData(){
		return this.state.reports.map((report, index) => {
			console.log(report);
			console.log(index);
			const {recipient, file_name, createdAt} = report;
			var startIndex = file_name.lastIndexOf('/') + 1;
			var filename = file_name.substr(startIndex);
			return (
				<tr key={index}>
				<td>{index}</td>
				<td>{filename}</td>
				<td>{createdAt.substring(0,10)}</td>
				<td> <button class="button button1" onClick = {() => this.handleOpen(file_name)}>view</button> </td>
			</tr>
		)
		})
	}

	handleOpen(fileAddress) {
		var details = document.getElementById("details");
		details.style.display = "block";
	}

	renderData() {
		console.log(this.state.reports.length +"last");
		if (this.state.reports.length > 0) {
			return (
				<div>
					<div>{this.renderPopup()}</div>
					<table id='users'>
						<tr>
							<th>Index</th>
							<th>Report</th>
							<th>Date</th>
							<th>View Report</th>
						</tr>
						<tbody>
							{this.renderTableData()}
						</tbody>
					</table>
				</div>
			)
		} else {
			return (<h4>You have no availabe report now.</h4>);
		}
	}

	renderPopup() {
		return (
			<div id="details" class="modal">
				<div class="modal-content">
					<div class="modal-header">
						<h2>Report</h2>
						<span class="close" onClick = {() => this.handleClose()}>&times;</span>
					</div>

					<div class="modal-body">
						file should be here
						<div>
							<button class="button3" onClick = {() => this.downloadFile()}>Download</button>
							<button class="button3" onClick = {() => this.sharingEmail()}>Emailing</button>
							<button class="button3" onClick = {() => this.sharingLink()}>Linking</button>
							<button class="button3" onClick = {() => this.handleClose()}>Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const cookies = new Cookies();
		var type = cookies.get('type');
		var email = cookies.get('email');
		if (type === '' || email === '') {
			this.props.history.push("/");
		}
		return (
			<div className="report">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Report</h2>
				{this.renderData()}
				<Link className="link"to="/home">return home</Link>
							<div class="image"></div>

			</div>
		);
	}

	downloadFile() {

	}

	sharingEmail() {

	}

	sharingLink() {

	}

	handleClose() {
		var details = document.getElementById("details");
		this.setState({editing: false});
		details.style.display = "none";
	}

}

export default view_report;
