import React, { useMemo } from 'react';
import './Divider.scss';
import {
    StyleProps,
    computeProps,
} from '../../../utils/componentUtils/propComputer';

export interface DividerProps extends StyleProps {
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Divider(props: React.PropsWithChildren<DividerProps>) {
    const { className, ref, onClick, ...etc } = props;

    return (
        <div
            {...computeProps(etc)}
            onClick={props.onClick}
            className={className ? `Divider ${className}` : 'Divider'}
            ref={ref}
        >
            {props.children}
        </div>
    );
}

export default Divider;
