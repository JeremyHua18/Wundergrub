import {Link, withRouter} from "react-router-dom";
import React, { Component } from 'react';
import UserDataService from "../services/user.service";
import Cookies from 'universal-cookie';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.okEmail = false;
        this.okPass = false;
        this.okComfirm = false;

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
                            with a 6-character code. Please enter the code so we will let you reset your
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
                        <div id="invalidEmail" className="registrationError"></div>
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
                            placeholder="Code"
                            value={this.state.input_code}
                            onChange={this.update}
                            name="input_code"
                        />
                        <div id="invalidCode" className="registrationError"></div>
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
                            name="conf_password"
                            value={this.state.conf_password}
                            onChange={this.update}
                        />
                        <div id="unconfirmedPassword" className="registrationError"></div>
                    </div>

                    <button onClick = {this.changePassword.bind(this)}> Submit </button>
                </div>
            </div>
        )
    }

    update(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'email') {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
            if (!expression.test(String(value).toLowerCase())) {
                document.getElementById("invalidEmail").innerHTML =
                    "Your E-mail address is not valid.";
                this.okEmail = false;
            } else {
                document.getElementById("invalidEmail").innerHTML = "";
                this.okEmail = true;
            }
        } else if (name === 'input_code') {

        } else if (name === 'password') {
            var passwordValidator = require('password-validator');
            var validator1 = new passwordValidator().is().min(6).is().max(50);
            var validator2 = new passwordValidator().has().lowercase();
            var validator3 = new passwordValidator().has().uppercase();
            var validator4 = new passwordValidator().has().digits();
            var validator5 = new passwordValidator().has().not().spaces();
            if (!validator1.validate(value)) {
                document.getElementById("invalidPassword").innerHTML =
                    "Password length must be greater than 6 and less than 50.";
                this.okPass = false;
            } else if (!validator2.validate(value)) {
                document.getElementById("invalidPassword").innerHTML =
                    "Password must contain a lowercase letter.";
                this.okPass = false;
            } else if (!validator3.validate(value)) {
                document.getElementById("invalidPassword").innerHTML =
                    "Password must contain an uppercase letter.";
                this.okPass = false;
            } else if (!validator4.validate(value)) {
                document.getElementById("invalidPassword").innerHTML =
                    "Password must contain a number.";
                this.okPass = false;
            } else if (!validator5.validate(value)) {
                document.getElementById("invalidPassword").innerHTML =
                    "Password must not contain space.";
                this.okPass = false;
            } else {
                document.getElementById("invalidPassword").innerHTML = "";
                this.okPass = true;
            }
        } else if (name === 'conf_password') {
            let password = this.state.password;
            if (value !== password) {
                document.getElementById("unconfirmedPassword").innerHTML = "Passwords do not match!";
                this.okComfirm = false;
            } else {
                document.getElementById("unconfirmedPassword").innerHTML = "";
                this.okComfirm = true;
            }
        }
    }

    sendEmail(e) {
        e.preventDefault();
        if (!this.okEmail) {
            alert("Invalid E-mail address!");
        } else {
            var row = UserDataService.get(this.state.email);
            var self = this;
            row.then(function (result) {
                if (result.data === '') {
                    alert("This e-mail address is not used!");
                } else {
                    var nodemailer = require('nodemailer');

                }
            });
        }

    }

    resendEmail(e) {

    }

    checkCode(e) {

    }

    changePassword(e) {

    }
}

export default withRouter(ResetPassword);