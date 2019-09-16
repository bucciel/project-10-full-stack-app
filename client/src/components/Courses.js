/* Stateful class component */
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Courses extends Component {
    state = {
        courses: []
    };

    /* fetch courses data from Rest API */
    async componentDidMount() {
        const res = await this.props.context.data.api('/courses', 'GET');
        if (res.status === 200) {
            return res.json().then(courses => this.setState({ courses: courses }));     // display course links
        } else if (res.status === 500) {
            window.location.href = '/error';    // display 500 error status page
        } else {
            throw new Error();
        }
    }

    render() {
        const { courses } = this.state;
        return (
            <div className="bounds">
                {courses.map((course, index) =>
                    <div key={"a" + index} className="grid-33">
                        <a key={"b" + index} className="course--module course--link" href={"/courses/" + (course.id)}>
                            <h4 key={"c" + index} className="course--label">Course</h4>
                            <h3 key={"d" + index} className="course--title">{course.title}</h3>
                        </a>
                    </div>
                )}
                <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </a></div>
            </div>
        );
    };
};

export default Courses;