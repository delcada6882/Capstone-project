import React, { useMemo } from 'react';
import './Divider.scss'
import { computeProps } from '../../../utils/componentUtils/propComputer';

function Divider(props) {
    const { className, look, ...etc } = props;

    const computedClassName = useMemo(() => {
        let temp = ['Divider'];
        if (look) temp.push(look);
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);

    return (
        <div
            {...computeProps(etc)}
            className={className ? `${computedClassName}` : 'Divider'}
        >
            {props.children}
        </div>
    );
}

export default Divider;
