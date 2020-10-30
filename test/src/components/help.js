import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class help extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  value: 'Please leave your question here and our team will contact you later via email.'
		};
	
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.textAreaRef = React.createRef();

	  }
	
	  handleChange(event) {
		this.setState({value: event.target.value});
	  }
	
	  handleSubmit(event) {
		alert('Your question was submitted: ' + this.state.value);
		event.preventDefault();
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
			<div className="help">
				<h5><Link className = "link" to="/home">Home</Link></h5>
				<h2>Help Center</h2>
				<form onSubmit={this.handleSubmit}>
					<label>
					<br styles="clear:both" />
                	<div className="form-group">
                  		<input type="text" className="form-control" name="title" placeholder="Question Title" required />
                	</div>
					<textarea ref={this.textAreaRef} style = {{width: 400}} value={this.state.value} onChange={this.handleChange}/>
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div class="image"></div>
		  </div>

		);
	  }


}

export default help;

