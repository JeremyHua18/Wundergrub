import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AnnouncementDataService from "../services/announcement.service";

class viewAnnouncements extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			announcements:[],
			title: '',
			date: new Date("01/00/2000"),
			author: '',
			content:'',
			newTitle: '',
			text: ''
		};

		var allInfo = AnnouncementDataService.getAll();
        var self = this;
        allInfo.then(function(result) {

	        for (var i = 0; i < result.data.length; i++){
	            // console.log(result.data[i]);
	            var temp = self.state.announcements;
	            temp.push(result.data[i]);
	            self.setState({announcements: temp});
	        }

		})
	}


	handleChange(e) {
	  	let name = e.target.name;
        let value = e.target.value;
		this.setState({ [name]: value });
	}

	handleSubmit() {
		if (this.state.newTitle == '') {
			alert('Please input a title.');
		} else if (this.state.text == '') {
			alert('Please input the content of your announcement.');
		} else {
			const cookies = new Cookies();
	        var username = cookies.get('email');
	        var today = new Date();
	        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	        var data = {
	        	author: username,
	        	title: this.state.newTitle,
	        	date: date,
	        	content: this.state.text
	        }
	        console.log(data);

	        AnnouncementDataService.create(data).then(response => {
				console.log(response.data);
				alert('Announcement successfully posted');
				window.location.reload(false);
			}).catch(e => {
				console.log(e)
			});
		}
	}

	viewAnnouncement(announcement){
		this.setState({
			title: announcement.title,
            author: announcement.author,
            date: announcement.date,
            content: announcement.content
        });
        var details = document.getElementById("details");
        details.style.display = "block";
	}

	handleOpen(){
        var newAnnouncement = document.getElementById("newAnnouncement");
        newAnnouncement.style.display = "block";
    }

	handleClose() {
        var newAnnouncement = document.getElementById("newAnnouncement");
        newAnnouncement.style.display = "none";
    }

    closeAnnouncement() {
    	this.setState({
    		newTitle: '',
    		text: ''
    	})
    	var details = document.getElementById("details");
        details.style.display = "none";
    }

	newAnnouncement(){
		return (
            <div id="newAnnouncement" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h>New Announcement</h>
                  <span class="close" onClick = {(e) => this.handleClose(e)}>&times;</span>
                </div>
                <form name="announcementContent">
                <div class="modal-body" name="body">
                  	<div>
		                <div>
		                    <label for="title">Title: </label>
		                    <input
		                        type="edit"
		                        name="newTitle"
		                        onChange={(e) => this.handleChange(e)}
		                    />
		                </div>
		                <div>
		                    <textarea
		                    	style={{minWidth: '100%'}}
		                        placeholder= "Announcement Content"
		                        name="text"
		                        rows="7"
		                        onChange={(e) => this.handleChange(e)}
		                    />
		                </div>
		            </div>
                <div>
                    <button class="button1" onClick = {() => this.handleSubmit()}>Submit</button>
                </div>
                </div>
                </form>
              </div>
            </div>
        );
	}

	renderAnnouncement() {
        return (
            <div id="details" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h2>{this.state.title}</h2>
                  <span class="close" onClick = {() => this.closeAnnouncement()}>&times;</span>
                </div>
                <div class="modal-body">
                  <h name="author">By: {this.state.author}</h>
                  <p name="date">Date: {this.state.date.toString()}</p>
                  <p name="content">{this.state.content}</p>
                </div>
              </div>
            </div>
        );
    }

	renderTableData(){
        return this.state.announcements.map((announcement, index) => {
            const {id, title, author, date, content} = announcement;
            return (
                <tr key={date}>
                   <td>{date}</td>
                   <td>{title}</td>
                   <td> <button class="button button1" onClick = {() => this.viewAnnouncement(announcement)}>View</button> </td>
                </tr>
            )
        }).reverse()
    }

	render() {
		return (
		<div className="annoucement">
        <h5><Link className = "link" to="/home">Home</Link></h5>
        <h2>Annoucements</h2>
        	{this.newAnnouncement()}
        	{this.renderAnnouncement()}
        	<button class="button4" onClick = {() => this.handleOpen()}>New Announcement</button>
			<table id='announcements' style={{minWidth: '100%'}}>
	          <tr>
	             <th>Date</th>
	             <th>Title</th>
	             <th>Content</th>
	          </tr>
	          <tbody>
	             {this.renderTableData()}
	          </tbody>
	       </table>

			  <div class="image"></div>

          </div>

		);
	  }

	}

export default viewAnnouncements
