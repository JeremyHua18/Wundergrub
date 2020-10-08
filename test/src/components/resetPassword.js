import {Link, withRouter} from "react-router-dom";
import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import Cookies from 'universal-cookie';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            conf_password: '',
            gen_code: '',
            input_code: '',
            countdown: 0
        };

        //this.update = this.update.bind(this);
    }


    render() {
        return (
            <div>
            <div className="rp-check-identification">
                <h2>Forgot Your Password?</h2>
                <div className="rp-direction">
                    <p>Enter your email in the textfield below, and we will send your an email
                        with a 6-digit code. Please enter the code so we will let you reset your
                        password. If you have not received the email for a while, then click "resent".
                    </p>
                </div>

                <div className="rp-enter-email">
                    <input
                        type="text"
                        placeholder="Your Email"
                        value={this.state.email}
                        onChange={this.update}
                        name="email"
                    />
                    <p className="rp-first-error"></p>
                    <button onClick = {this.sendEmail.bind(this)} className="1st-send-btn"> Send </button>
                </div>

                <div className="rp-request-resend" style={{display: "none"}}>
                    <p>Have not got the email? Request another email:
                        <button onClick = {this.resendEmail.bind(this) } className="2nd-send-btn"> Re-send </button>
                    </p>
                </div>

                <div className="rp-enter-code" style={{display: "none"}}>
                    <input
                        type="text"
                        placeholder="Your Email"
                        value={this.state.email}
                        onChange={this.update}
                        name="input_code"
                    />
                    <button onClick = {this.checkCode.bind(this) } className="code-entered-btn"> Confirm </button>
                </div>
            </div>

            <div className="rp-reset-password" style={{display: "none"}}>
                <h3>Reset Your Password</h3>
                <div className="pasword">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.update}
                    />
                    <div id="invalidPassword" className="registrationError"></div>
                </div>

                <div className="password">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password1"
                        value={this.state.password1}
                        onChange={this.update}
                    />
                    <div id="unconfirmedPassword" className="registrationError"></div>
                </div>

                <button onClick = {this.changePassword.bind(this)}> Submit </button>
            </div>
        </div>
        )
    }

    sendEmail(e) {

    }

    resendEmail(e) {

    }

    checkCode(e) {

    }

    changePassword(e) {

    }
}

export default withRouter(ResetPassword);