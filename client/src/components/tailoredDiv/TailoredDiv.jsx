import React, { Component } from 'react';
import './tailoredDiv.css';

function TailoredDiv(props) {
    const computedClassName = `tailoredDiv ${props.className}`;
    const computedStyle = props.style;
    const computedId = props.id;
    const computedRef = props.ref;

    return (
        <div
            className={computedClassName}
            style={computedStyle}
            onClick={props.onClick}
            id={computedId}
            ref={computedRef}
        >
            {props.children}
        </div>
    );
}

export default TailoredDiv;
