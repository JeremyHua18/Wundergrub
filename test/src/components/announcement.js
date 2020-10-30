import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserDataService from "../services/user.service"



class annoucement extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  title: 'Title',
		  text:'Annoucement here'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	  }



	  handleChange(event) {
        const { name, value } = event.target;
		this.setState({ [name]: value });
	  }

	  handleSubmit(event) {
		alert('Your question was submitted: ' + this.state.value);
		event.preventDefault();
	  }

	  render() {
		  
		return (
		<div className="annoucement"> 
        <h5><Link className = "link" to="/home">Home</Link></h5>
        <h2>Annoucement</h2>
		<a href="#" className="list-group-item">
			<h4 className="list-group-item-heading">{this.state.title}</h4>
			<p className="list-group-item-text">{this.state.text}</p>
		</a>
		<a href="#" className="list-group-item">
			<h4 className="list-group-item-heading">Annoucement</h4>
			<p className="list-group-item-text">Brief summary.</p>
		</a> 
		<a href="#" className="list-group-item">
			<h4 className="list-group-item-heading">Annoucement</h4>
			<p className="list-group-item-text">Brief summary.</p>
		</a> 

		<br styles="clear:both" />
		<br styles="clear:both" />

		
		<h5>New Annoucement</h5>

              <form role="form">
                <div className="form-group">
                  <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.handleChange} name="title" placeholder="Title" required />
                </div>
                
                <div className="form-group">
                <textarea className="form-control" type="textarea" id="subject" value={this.state.text} onChange={this.handleChange} name="text" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>
                   
				<input type="submit" value="Submit" />
              </form>
			  <div class="image"></div>

          </div>


		)
	  }
	  
	}





export default annoucement

/*
	constructor(props) {
		super(props);
		this.state = {
		  text: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.textAreaRef = React.createRef();

	  };
	
	  handleChange(event) {
		this.setState({value: event.target.value});
	  }
	
	  handleSubmit(event) {
		alert('Your annoucement was submitted: ' + this.state.value);
		event.preventDefault();
		const value = this.state.value;
		this.setState({value: ""});
	  }

	componentDidMount() {
        this.textareaChange(this.textAreaRef.current);
    }

    textareaChange(ta) {
        ta.style.height = "100px";
        ta.style.height = ta.scrollHeight + "px";
    }
	


	render() {
		return (
			<div className="annoucement">
                <h5><Link className = "link" to="/home">Home</Link></h5>
                <h2>Annoucement</h2>
				<form onSubmit={this.handleSubmit}>
				<label>
				<h4>{this.state.value}</h4>
				<textarea ref={this.textAreaRef} style = {{width: 400}} value={this.state.value} onChange={this.handleChange}/>
				</label>
				<input type="submit" value="Submit" />
				</form>
				<Link className="link"to="/home">return home</Link>
				<div class="image"></div>
			</div>
		);
	}
	*/