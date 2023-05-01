import React from 'react';
import './Div.scss';
import {
    StyleProps,
    computeProps,
} from '../../../utils/componentUtils/propComputer';

export interface DivProps extends StyleProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Div(
    props: React.PropsWithChildren<DivProps>,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const { className, onClick, ...etc } = props;

    const renderDiv = () => {
        return (
            <div
                {...computeProps(etc)}
                onClick={props.onClick}
                className={className ? `Div ${className}` : 'Div'}
                ref={ref}
            >
                {props.children}
            </div>
        );
    };
    return renderDiv();
}

export default React.forwardRef(Div);
