import React from 'react';

/* exports a function that renders any validation errors sent from the API via the <ErrorsDisplay> function component */
export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    /* renders submit button of a form and handles functionality */
    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    /* renders cancel button of a form and handles functionality */
    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className='pad-bottom'>
                    <button className='button' type='submit'>{submitButtonText}</button>
                    <button className='button button-secondary' onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className='validation--errors--label'>Validation errors</h2>
                <div className='validation-errors'>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}