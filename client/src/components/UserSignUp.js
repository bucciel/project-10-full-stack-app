/* Stateful class component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    /* handles state change */
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    /* submit function that creates a new user and sends their credentials to the Express server */
    submit = () => {
        const { context } = this.props;
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        let user = {};
        /* check that all form fields are filled out, if not, display error message */
        if (firstName === '' || lastName === '' || emailAddress === '' || password === '' || confirmPassword === '') {
            this.setState({
                errors: ['One or more fields are missing information, please check that all fields are filled out correctly']
            })
            return;
        }

        if (password !== confirmPassword) {     // display error message if passwords don't match
            this.setState({
                errors: ['The entered passwords do not match']
            })
            return;

        } else {        // otherwise set properties for user
            user = {
                firstName,
                lastName,
                emailAddress,
                password
            };
        }

        /* returns a promise: either an array of errors (sent from the API if the response is 400), or an empty array (if the response is 201) */
        context.data.createUser(user)
            .then(res => {
                if (res.status === 500) {
                    this.props.history.push('/error');    // redirects url to error route
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/');
                        });
                }
            })
            .catch((err) => {        // handles a rejected promise returned by createUser()
                console.log(err);
                this.setState({
                    errors: ['That email is already being used.']
                })
                // this.props.history.push('/error');    // redirects url to error route
            });
    }

    /* cancel function */
    cancel = () => {
        this.props.history.push('/');    // redirects to main page of app
    }

    render() {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;

        /* returns input fields to be used in each form */
        return (
            <div className='bounds'>
                <div className='grid-33 centered signin'>
                    <h1>Sign Up</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText='Sign Up'
                        elements={() => (
                            <React.Fragment>
                                <input
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    className=''
                                    value={firstName}
                                    onChange={this.change}
                                    placeholder='First Name' />
                                <input
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    className=''
                                    value={lastName}
                                    onChange={this.change}
                                    placeholder='Last Name' />
                                <input
                                    id='emailAddress'
                                    name='emailAddress'
                                    type='text'
                                    className=''
                                    value={emailAddress}
                                    onChange={this.change}
                                    placeholder='Email Address' />
                                <input id='password'
                                    name='password'
                                    type='password'
                                    className=''
                                    value={password}
                                    onChange={this.change}
                                    placeholder='Password' />
                                <input id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    className=''
                                    value={confirmPassword}
                                    onChange={this.change}
                                    placeholder='Confirm Password' />
                            </React.Fragment>
                        )} />
                    <p> Already have a user account? <Link to='/signin'>Click here</Link> to sign in! </p>
                </div>
            </div>
        );
    }
}


export default UserSignUp;