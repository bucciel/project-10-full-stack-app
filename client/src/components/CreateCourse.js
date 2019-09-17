/* Stateful class component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    /* input handler */
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    /* create handler */
    handleSubmit = async (e) => {
        e.preventDefault();
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authUserId = authUser.id;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;
        const data = this.state;
        data.userId = authUserId;

        /* API POST request */
        const res = await context.data.api('/courses', 'POST', data, true, { emailAddress, password });
        console.log(emailAddress);
        console.log(password);
        if (res.status === 200 || res.status === 201) {     // if status 200 or 201, redirect user to main page 
            window.location.href = '/';
        } else if (res.status === 400) {     // status 400, display error message
            this.setState({
                errors: ['Please check that all field inputs are correct']
            })
            return;
        } else if (res.status === 401 || res.status === 403) {     // if status 401 or 403 display forbidden message
            window.location.href = '/forbidden';
        } else {
            window.location.href = '/error';      // display error page
        }
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        const { context } = this.props;
        const authUser = context.authenticatedUser;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {
                        this.state.errors.length ?
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                                    </ul>
                                </div>
                            </div> : null
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" onChange={this.change} value={title} className="input-title course--title--input" placeholder="Course title..." />
                                </div>
                                <p>By {authUser.firstName} {authUser.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" onChange={this.change} value={description} className="" placeholder="Course description..."></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={this.change} value={estimatedTime} className="course--time--input"
                                                placeholder="Hours" />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div><textarea id="materialsNeeded" name="materialsNeeded" onChange={this.change} value={materialsNeeded} className="" placeholder="List materials..."></textarea></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <Link className="button button-secondary" to="/">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCourse;