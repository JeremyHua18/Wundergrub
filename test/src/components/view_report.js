import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import ReportDataService from "../services/report.service";
import DownloadDataService from "../services/download.service";
import WonderEmail from "../emailer/WonderEmail";
import UserDataService from "../services/user.service";


class view_report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reports: [],
			fullname: '',
			username: '',
			report: '',
			source: '',
			recipient: '',
			file_name: '',
			nurl: '',
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

		var userInfo = UserDataService.get(this.state.username);
		userInfo.then(function (result) {
			self.setState({nickname: result.data.fullname})
			console.log(result);
			console.log("read above");
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
		this.state.report = fileAddress;

		const bucket = this.state.report.split("/")[2];
		const key = this.state.report.split(bucket + "/")[1];
		var data = {
			bucket: bucket,
			key: key
		}
		var self = this;
		DownloadDataService.getFileContent(data)
			.then((res) => {
				console.log(res);
				// var newblob = new Blob(res.data.fileContent, "text/csv");
				console.log(typeof res);
				var file = new File(res.data.Body.data, key, {
					type: res.data.ContentType,
				});
				// new F
				console.log(file);
				//res.data.fileContent.pipe(file);
				var newUrls = window.URL.createObjectURL(file).substring(5);
				// fs.writeFileSync(newUrls, res.data.fileContent.Body.toString());
				// var ele = document.getElementById("embed-element");
				console.log(newUrls);
				self.setState({nurl: newUrls});

				// ele.setAttribute("src", newUrls.substring(5));
				// //console.log(ele.getAttribute("src"));
			});

		var details = document.getElementById("details");
		details.style.display = "block";
		var emailing = document.getElementById("enter-email");
		emailing.style.display = "none";
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
						<embed id="embed-element" src={this.state.nurl} width="100%" height="500px"/>
						<div>
							<button class="button3" onClick = {() => this.downloadFile()}>Download</button>
							<button class="button3" onClick = {() => this.sharingEmail()}>Emailing</button>
							<button class="button3" onClick = {() => this.sharingLink()}>Linking</button>
							<button class="button3" onClick = {() => this.handleClose()}>Close</button>
						</div>
						<div id="enter-email">
							<input type="text" id="email-input" name="email-input"></input>
							<button class="button3" onClick = {() => this.sendEmail()}>Send</button>
							<button class="button3" onClick = {() => this.closeSharing()}>Cancel</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	update(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
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
		const bucket = this.state.report.split("/")[2];
		const key = this.state.report.split(bucket + "/")[1];
		var data = {
			bucket: bucket,
			key: key
		}
		DownloadDataService.getURL(data)
			.then((res) => {
				console.log(res.data);
				var win = window.open(res.data.url, '_blank');
		});
	}

	sharingEmail() {
		var details = document.getElementById("enter-email");
		details.style.display = "block";
	}

	sharingLink() {

	}

	handleClose() {
		var details = document.getElementById("details");
		this.setState({editing: false});
		details.style.display = "none";
	}

	closeSharing() {
		var details = document.getElementById("enter-email");
		details.style.display = "none";
	}

	sendEmail() {
		var details = document.getElementById("email-input");
		var targetAddress = details.value;

		const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
		if (!expression.test(String(targetAddress).toLowerCase())) {
			alert("Your E-mail address is not valid.");
		} else {
			const bucket = this.state.report.split("/")[2];
			const key = this.state.report.split(bucket + "/")[1];
			var data = {
				bucket: bucket,
				key: key
			}
			var userFullName = this.state.nickname;
			var userEmail = this.state.username;
			DownloadDataService.getURL(data)
				.then((res) => {
					var info = {
						address: targetAddress,
						sharable: res.data.url,
						from: userEmail,
						name: userFullName
					}
					var emailSent = WonderEmail.sendSharedReport(info);
					emailSent.then((result) => {
						if (result.data === "ok") {
							alert("E-mail has been sent.");
						} else {
							alert("E-mail has not been sent.")
						}
					})
				});
		}
	}

}

export default view_report;
