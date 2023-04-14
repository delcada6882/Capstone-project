import React from 'react';
import './ExampleComponent.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';

function ExampleComponent(props) {
    // <-- This is an example component to help template components to replace regular basic html tags
    const { className, ExampleCustomProperty, ...etc } = props; // <-- this deconstructs the props, any custom properties or props you'll edit inside the component can go in here

    return (
        <div
            {...computeProps(etc)} // <-- this right here adds easy shorthand styling, so you don't have to put it in a style tag or setup a single classname to target one element in the scss
            className={
                className ? `ExampleComponent ${className}` : 'ExampleComponent'
            }
            onClick={onClick}
            id={id}
        >
            {props.children}
            <div>This is only an example: {ExampleCustomProperty}</div>
        </div>
    );
}

export default ExampleComponent;
