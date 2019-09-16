import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

/* provides the application state and any actions or event handlers that need to be shared between components */
export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser } = this.state;
        const value = {             // value object provides the utility methods of the class Data
            authenticatedUser,
            data: this.data,
            actions: {              // add the 'actions' property and object
                signIn: this.signIn,
                signOut: this.signOut
            },
        };
        return (                              // passes context to provider 
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    /* user sign-in */
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);   // calls getUser() in Data.js, which makes a GET request to the protected /users route on the server & returns user data
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            const cookieOptions = {
                expires: 1      // expries in 1 day
            };
            Cookies.set('authenticatedUser', JSON.stringify(user), { cookieOptions });
        }
        return user;
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
