import React from 'react';

function FormWrapper(props) {
    const submitHandler = (event) => {
        event.preventDefault();
        if (props.onSubmit) props.onSubmit();
    };

    return (
        <form action="#" onSubmit={submitHandler}>
            {props.children}
        </form>
    );
}
export default FormWrapper;
