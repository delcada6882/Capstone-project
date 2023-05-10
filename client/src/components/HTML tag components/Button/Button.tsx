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
}

function Button(
    props: React.PropsWithChildren<ButtonProps>,
    ref: React.ForwardedRef<HTMLButtonElement>
) {
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
            ref={ref}
            className={computedClassName}
        >
            {props.children}
        </button>
    );
}

export default React.forwardRef(Button);
