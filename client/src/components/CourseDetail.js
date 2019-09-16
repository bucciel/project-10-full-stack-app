/* Stateful class component */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
    state = {
        course: [],
        isUserAuth: null,
    };

    /* FETCH course details from REST API */
    async componentDidMount() {
        const res = await this.props.context.data.api(`/courses/${this.props.match.params.id}`, 'GET');    // calls api() method to return details for a specified course
        if (res.status === 200) {
            return res.json().then(course => {
                const { context } = this.props;
                const authUser = context.authenticatedUser;
                let user = null;
                if (authUser && authUser.id === course[0].userId) {     // if user owns the requested course, allow access
                    user = true;
                }
                this.setState({ course: course, isUserAuth: user });
            });
        } else if (res.status === 404) {
            window.location.href = '/notfound';
        } else if (res.status === 500) {
            window.location.href = '/error';
        } else {
            throw new Error();
        }
    }

    /* Delete course handler */
    handleDelete = async (e) => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const emailAddress = authUser.emailAddress;
        const password = authUser.password;

        if (window.confirm('Are you sure you want to delete this course ?')) {
            const res = await context.data.api(`/courses/${this.props.match.params.id}`, 'DELETE', null, true, { emailAddress, password });  // calls api() method to delete course
            if (res.status === 204) {
                window.location.href = '/';
                return [];
            } else if (res.status === 500) {
                window.location.href = '/error';
            } else {
                throw new Error();
            }
        }
    }

    render() {
        const course = this.state.course[0];
        const user = this.state.isUserAuth;

        return (
            <div>
                {this.state.course.length ?
                    <div>
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    {user ?
                                        <span>
                                            <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                                            <Link onClick={this.handleDelete} to='#' className="button">Delete Course</Link>
                                        </span>
                                        : null
                                    }
                                    <Link className="button button-secondary" to="/">Return to Courses</Link>
                                </div>
                            </div>
                        </div>

                        <div className="bounds course--detail">
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <h3 className="course--title">{course.title}</h3>
                                    <p>By {course.student.firstName} {course.student.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <ReactMarkdown source={course.description} />
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <h3>{course.estimatedTime}</h3>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <ul>
                                                <ReactMarkdown source={course.materialsNeeded} />
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <h3>Loading Course Information..</h3>
                }
            </div>
        );
    }
}

export default CourseDetail;