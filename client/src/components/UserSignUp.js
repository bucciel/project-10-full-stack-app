/* Stateful class component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    class=""
                                    placeholder="First Name"
                                    value={this.state.firstName} />
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    class=""
                                    placeholder="Last Name"
                                    value={this.state.lastName} />
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    class=""
                                    placeholder="Email Address"
                                    value={this.state.emailAddress} />
                                <input id="password"
                                    name="password"
                                    type="password"
                                    class=""
                                    placeholder="Password"
                                    value={this.state.password} />
                                <input id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    class=""
                                    placeholder="Confirm Password"
                                    value={this.state.password} />
                            </React.Fragment>
                        )} />
                    <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign in!
                    </p>
                </div>
            </div>
        );
    }

    export default UserSignUp;