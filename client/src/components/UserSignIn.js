/* Stateful class component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
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

    /* submit function */
    submit = (e) => {        // log in an authenticated user upon submitting the 'Sign In' form
        e.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)    // accepts two arguments to log in a registered user
            .then((user) => {
                if (user === null) {        // if returned promise value is null, return error validation message
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful'] };
                    });
                } else {        // if user object is returned, navigate user to the /authenticated route 
                    this.props.history.push(from);
                    console.log('Success! You\'re now signed in!');
                }
            })
            .catch((error) => {     // handle rejected promise returned by signIn()
                console.error(error);
                this.props.history.push('/error');    // navigate user from /signin to /error
            });
    }
    cancel = () => {
        this.props.history.push('/');   // redirects user back to the home route upon clicking 'Cancel' button
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className='bounds'>
                <div className='grid-33 centered signin'>
                    <h1>Sign In</h1>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText='Sign In'
                        elements={() => (
                            <React.Fragment>
                                <input id='emailAddress'
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
                            </React.Fragment>
                        )} />
                    <p>Don't have a user account? <Link to={'/signup'}>Click here</Link> to sign up!</p>
                </div>
            </div>
        );

        // return (
        //     <div className='bounds'>
        //         <div className='grid-33 centered signin'>
        //             <h1>Sign In</h1>
        //             {
        //                 this.state.errors.length ?
        //                     <div>
        //                         <div className='validation-errors'>
        //                             <ul>
        //                                 {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
        //                             </ul>
        //                         </div>
        //                     </div> : null
        //             }
        //             <div>
        //                 <form onSubmit={this.submit}>
        //                     <div>
        //                         <input
        //                             id='emailAddress'
        //                             name='emailAddress'
        //                             type='text'
        //                             className=''
        //                             placeholder='Email Address'
        //                             onChange={this.change}
        //                             value={emailAddress} />
        //                     </div>
        //                     <div>
        //                         <input
        //                             id='password'
        //                             name='password'
        //                             type='password'
        //                             className=''
        //                             placeholder='Password'
        //                             onChange={this.change}
        //                             value={password} />
        //                     </div>
        //                     <div className='grid-100 pad-bottom'>
        //                         <button className='button' type='submit'>Sign In</button>
        //                         <Link className='button button-secondary' to='/'>Cancel</Link>
        //                     </div>
        //                 </form>
        //             </div>
        //             <p>&nbsp;</p>
        //             <p>Don't have a user account? <a href='/signup'>Click here</a> to sign up!</p>
        //         </div>
        //     </div>
        // );
    }
}

export default UserSignIn;