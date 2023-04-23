import React, { useMemo } from 'react';
import './Button.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';

export interface ButtonProps {
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    look?:
        | 'standardBlue'
        | 'standardRed'
        | 'primary'
        | 'secondary'
        | 'danger'
        | 'success'
        | 'warning';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    ref?: React.Ref<HTMLButtonElement>;
}

function Button(props: React.PropsWithChildren<ButtonProps>) {
    const { className, type, ref, look, onClick, ...etc } = props;

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
            ref={ref}
            className={computedClassName}
        >
            {props.children}
        </button>
    );
}

export default Button;
