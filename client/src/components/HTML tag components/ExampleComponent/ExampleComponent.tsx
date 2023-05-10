import React from 'react';
import './ExampleComponent.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';

export interface ExampleComponentProps {
    className?: string;
    ExampleCustomProperty?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    id?: string;
}

function ExampleComponent(
    props: React.PropsWithChildren<ExampleComponentProps>
) {
    // <-- This is an example component to help template components to replace regular basic html tags
    const { className, ExampleCustomProperty, onClick, id, ...etc } = props; // <-- this deconstructs the props, any custom properties or props you'll edit inside the component can go in here

    return (
        <div
            {...computeProps(etc)} // <-- this right here adds easy shorthand styling, so you don't have to put it in a style tag or setup a single classname to target one element in the scss
            className={
                className ? `ExampleComponent ${className}` : 'ExampleComponent'
            }
            onClick={props.onClick} // <-- Nodice how we're saying props.onClick here, even though we're deconstructing the props above, This is because using props.function keeps the 'this' keyword proper
            id={id}
        >
            {props.children}
            <div>This is only an example: {ExampleCustomProperty}</div>
        </div>
    );
}

export default ExampleComponent;
