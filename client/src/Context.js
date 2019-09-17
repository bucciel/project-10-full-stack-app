import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

/* provides the application state and any actions or event handlers that need to be shared between components */
export class Provider extends Component {

    state = {       // if there is no authenticated user, display the default header, otherwise, display the user name in the header 
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        userPassword: Cookies.getJSON('userPassword') || null
    };

    /* create new instances of the data module */
    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser, userPassword } = this.state;
        const value = {             // value object provides the utility methods of the class Data
            authenticatedUser,
            userPassword,
            data: this.data,
            actions: {              // add the 'actions' property and object
                signIn: this.signIn,
                signOut: this.signOut,
                updateCourse: this.updateCourse,
                createCourse: this.createCourse,
                deleteCourse: this.deleteCourse
            },
        };
        return (                              // pass context to provider 
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    /* user sign-in */
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);   // calls getUser() in Data.js, which makes a GET request to the protected /users route on the server & returns user data
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    userPassword: password
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
            Cookies.set('userPassword', JSON.stringify(password), { expires: 1 });
        }
        return user;
    }

    /* update course for associated user */
    updateCourse = async (course, id, { emailAddress, password }) => {
        const updatedCourse = await this.data.updateCourseDetail(course, id, { emailAddress, password });
        if (updatedCourse) {
            return updatedCourse
        };
    }

    /* create  course for associated user */
    createCourse = async (course, { emailAddress, password }) => {
        const createdCourse = await this.data.createCourse(course, { emailAddress, password });
        if (createdCourse) {
            return createdCourse;
        };
    }
    /* user sign-out */
    signOut = () => {
        this.setState({ authenticatedUser: null });
        Cookies.remove('authenticatedUser');
    }
}

/* create consumer */
export const Consumer = Context.Consumer;

/**
 * a higher-order component that wraps the provided component in a Context Consumer component
 * @param {class} Component - a React component
 * @returns {function} - a higher-order component
*/

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Context.Consumer>
                {context => <Component {...props} context={context} />}
            </Context.Consumer>
        );
    }
}
