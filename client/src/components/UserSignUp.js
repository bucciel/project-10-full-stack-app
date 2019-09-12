/* Stateful class component */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
    }
    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        return (
            <div class="bounds">
                <div class="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    class=""
                                    placeholder="First Name"
                                    value={this.state.firstName} />
                            </div>
                            <div>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    class=""
                                    placeholder="Last Name"
                                    value={this.state.lastName} />
                            </div>
                            <div>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    class=""
                                    placeholder="Email Address"
                                    value={this.state.emailAddress} />
                            </div>
                            <div>
                                <input id="password"
                                    name="password"
                                    type="password"
                                    class=""
                                    placeholder="Password"
                                    value={this.state.password} />
                            </div>
                            <div>
                                <input id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    class=""
                                    placeholder="Confirm Password"
                                    value={this.state.password} />
                            </div>
                            <div class="grid-100 pad-bottom">
                                <button class="button" type="submit">Sign Up</button>
                                <button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
                </div>
            </div>
        )
    }
}






export default UserSignUp;