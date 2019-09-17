/* Stateless functional component */
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.PureComponent {
    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return (
            <div className="header">
                <div className="bounds">
                    <Link className="header--logo" to="/">Course List</Link>
                    <nav>
                        {authUser ? (   // ternary operator to render content representing the current state
                            <React.Fragment>   {/* if there is an authenticated user in state, render a "Welcome {authUser.name}" message */}
                                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                                <Link to="/signout">Sign Out</Link>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>    {/* if the authenticatedUser state is null, render the default navigation with "Sign Up" and "Sign In" links */}
                                    <Link className="signup" to="/signup">Sign Up</Link>
                                    <Link className="signin" to="/signin">Sign In</Link>
                                </React.Fragment>
                            )}
                    </nav>
                </div>
            </div>
        );
    }
};

export default Header;