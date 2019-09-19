/* Stateful class component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: '',
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

    /* API GET request */
    async componentDidMount() {
        const res = await this.props.context.data.api(`/courses/${this.props.match.params.id}`, 'GET');

        if (res.status === 200) {       // if status is 200, return course details 
            return res.json().then(course => this.setState({
                title: course.course.title,
                description: course.course.description,
                estimatedTime: course.course.estimatedTime,
                materialsNeeded: course.course.materialsNeeded,
                userId: course.course.userId,
            }));
        } else if (res.status === 404) {        // if status is 404, display page not found message
            window.location.href = '/notfound';
        } else if (res.status === 500) {       // if status is 500, display error message
            window.location.href = '/error';
        } else {
            throw new Error();
        }
    }

    componentDidUpdate() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const courseUserId = this.state.userId;
        if (authUser.id !== courseUserId) {
            window.location.href = '/forbidden';
        }
    }

    /* update course handler */
    handleUpdate = async (e) => {
        e.preventDefault();
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const authUserId = authUser.id;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;
        const data = this.state;
        data.userId = authUserId;

        /* API PUT request */
        const res = await context.data.api(`/courses/${this.props.match.params.id}`, 'PUT', data, true, { emailAddress, password });
        if (res.status === 204) {       // if status is 204, display updated course
            this.setState({ errors: [] });
            window.location.href = `/courses/${this.props.match.params.id}`;

        } else if (res.status === 400) {    // if status is 400, display error message
            this.setState({
                errors: ['Please check that all fields are filled in correctly']
            })
            return;
        } else if (res.status === 401 || res.status === 403) {      // if status is 401 or 403, display forbidden page
            window.location.href = '/forbidden';
        } else {
            window.location.href = '/error';
        }
    }

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    {this.state.errors.length ?
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    {this.state.errors.map((error, i) => <li key={i}>{error}</li>)}
                                </ul>
                            </div>
                        </div> : null
                    }
                    <form onSubmit={this.handleUpdate}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div><input id="title" name="title" type="text" onChange={this.change} value={this.state.title} className="input-title course--title--input" placeholder="Course title..." /></div>
                                <p>By  </p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" onChange={this.change} value={this.state.description} className="" placeholder="Course description..." ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div><input id="estimatedTime" name="estimatedTime" type="text" onChange={this.change} value={this.state.estimatedTime} className="course--time--input"
                                            placeholder="Hours" /></div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={this.change} value={this.state.materialsNeeded} className="" placeholder="List materials..." ></textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <Link className="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default UpdateCourse