import React from 'react';

export default () => (
    <div className="bounds">
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
    </div>
);

/* project 7 NotFound code
import React, { Component } from 'react';

class NotFound extends Component {      //Renders 404 error photo to user when requested course can't be found
    render() {
        return (
            <div className="Not Found">
                <li>
                    <img src={require('./errorImages/error4.png')} alt={'404 page not found'} className={'center'} />
                </li>
            </div>
        );
    }
}

export default NotFound;
*/