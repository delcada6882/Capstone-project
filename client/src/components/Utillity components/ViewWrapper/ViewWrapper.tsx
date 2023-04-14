import React from 'react';
import Divider from '../../HTML tag components/Divider/Divider';
import './ViewWrapper.scss';

function ViewWrapper(props) {
    return (
        <Divider
            {...props}
            className={
                props.className
                    ? `ViewWrapper ${props.className}`
                    : 'ViewWrapper'
            }
        />
    );
}

export default ViewWrapper;
