import React, { useMemo } from 'react';
import './Button.scss'
import { computeProps } from '../../../utils/componentUtils/propComputer';

function Button(props) {
    const { className, type, look, onClick, ...etc } = props;

    const computedClassName = useMemo(() => {
        let temp = ['Button'];
        if (look) temp.push(look);
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);
    return (
        <button
            {...computeProps(etc)}
            onClick={onClick}
            type={type}
            className={computedClassName}
        >
            {props.children}
        </button>
    );
}

export default Button;
