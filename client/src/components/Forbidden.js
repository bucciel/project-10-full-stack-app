import React from 'react';

const Forbidden = () => {
    return (<div className="bounds" >
        <h1> Forbidden </h1>
        <p> You don't have authorization to do that </p>
        <button className="button button-primary btn-not-found"
            onClick={
                (e) => {
                    e.preventDefault();
                    window.location.href = '/';
                }
            }>Return to previous page</button>
    </div>
    );
}
export default Forbidden;