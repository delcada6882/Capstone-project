import React from 'react';
import './Label.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';

function Label(props) {
    const { className, type, ...etc } = props;
    let computedProperties = computeProps(etc);
    computedProperties.className = className ? `Label ${className}` : 'Label';

    switch (type) {
        case 'p':
            return <p {...computedProperties}>{props.children}</p>;
        case 'h1':
            return <h1 {...computedProperties}>{props.children}</h1>;
        case 'h2':
            return <h2 {...computedProperties}>{props.children}</h2>;
        case 'h3':
            return <h3 {...computedProperties}>{props.children}</h3>;
        case 'h4':
            return <h4 {...computedProperties}>{props.children}</h4>;
        case 'h6':
            return <h6 {...computedProperties}>{props.children}</h6>;
        default:
            return <label {...computedProperties}>{props.children}</label>;
    }
}

export default Label;
