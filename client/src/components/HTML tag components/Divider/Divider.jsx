import React from 'react';
import { computeProps } from '../../../utils/componentUtils/propComputer';

function Divider(props) {
    const { className, ...etc } = props;

    return (
        <div
            {...computeProps(etc)}
            className={className ? `Divider ${className}` : 'Divider'}
        >
            {props.children}
        </div>
    );
}

export default Divider;
