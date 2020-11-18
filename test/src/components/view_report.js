import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Cookies from 'universal-cookie';
import ReportDataService from "../services/report.service";
import DownloadDataService from "../services/download.service";


class view_report extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reports:[],
			recipient: '',
			file_name: '',
			title: '',
			url: '',
			emailTo: ''
		};
		const cookies = new Cookies();
		var email = cookies.get('email');
		var allInfo = ReportDataService.getUser(email);
        var self = this;
        allInfo.then(function(result) {

	        for (var i = 0; i < result.data.length; i++){
	            // console.log(result.data[i]);
	            var temp = self.state.reports;
	            temp.push(result.data[i]);
                self.setState({reports: []});
	            self.setState({reports: temp});
	        }

		})
	}

	update(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    }

	handleDownload(report) {
		const bucket = report.file_name.split("/")[2];
		const key = report.file_name.split(bucket + "/")[1];
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

	renderDetails(report) {
		const bucket = report.file_name.split("/")[2];
		const key = report.file_name.split(bucket + "/")[1];
		const title = report.file_name.split(report.recipient + "/")[1];
		var data = {
			bucket: bucket,
			key: key
		}
		DownloadDataService.getURL(data)
			.then((res) => {
        		this.setState({
					title: title,
		            url: res.data.url
		        });
		        var details = document.getElementById("details");
        		details.style.display = "block";
        	});
        console.log(this.state)

	}

	sendEmail() {}

	handleOpen(){
        var details = document.getElementById("details");
        details.style.display = "block";
    }

	handleClose() {
        var details = document.getElementById("details");
        details.style.display = "none";
    }

	renderReport() {
        return (
            <div id="details" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h1>Details</h1>
                  <span class="close" onClick = {() => this.handleClose()}>&times;</span>
                </div>
                <div class="modal-body">
                  <p name="title">Title: {this.state.title}</p>
                  <p name="url">Sharable Link: {this.state.url}</p>
                  <div>
                    <label for="emailTo">Share via Email: </label>
                    <input
                      type="edit"
                      name="emailTo"
                      placeholder="Enter email"
                      onChange={(e) => this.update(e)}
                    />
                    <button class="button button1" onClick = {() => this.sendEmail()}>Send Email</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }

	renderTableData(){
        return this.state.reports.map((report, index) => {
            const {id, recipient, file_name, createdAt} = report;
            const date = createdAt.split("T")[0];
            return (
                <tr key={date}>
                   <td>{date}</td>
                   <td> <button class="button button1" onClick = {() => this.renderDetails(report)}>Details</button> </td>
                   <td><button class="button button1" onClick = {() => this.handleDownload(report)}>Download</button></td>
                </tr>
            )
        }).reverse()
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
                <h2>Reports</h2>
                {this.renderReport()}
				<table id='announcements' style={{minWidth: '100%'}}>
		        	<tr>
		        		<th>Date</th>
		        		<th>Details</th>
		        		<th>Download</th>
		        	</tr>
		        	<tbody>
		        		{this.renderTableData()}
		        	</tbody>
		       	</table>
				<Link className="link"to="/home">return home</Link>
				<div class="image"></div>

			</div>
		);
	}
}

export default view_report;
