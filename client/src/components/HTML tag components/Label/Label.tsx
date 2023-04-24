import React from 'react';
import './Label.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';

export interface LabelProps {
    className?: string;
    type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h6';
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    id?: string;
    htmlFor?: string;
    style?: React.CSSProperties;
}

function Label(props: React.PropsWithChildren<LabelProps>) {
    const { className, onClick, type, htmlFor, style, id, ...etc } = props;
    const computedProperties = {
        ...computeProps(etc),
        className: className ? `Label ${className}` : 'Label',
        onClick: props.onClick,
        id: id,
        style: style,
        htmlFor: props.htmlFor,
    };

    switch (type) {
        case 'p':
            return <p {...computedProperties}>{props.children}</p>;
        case 'h1':
            return <h1 {...computedProperties}>{props.children}</h1>;
        case 'h2':
            return <h2 {...computedProperties}>{props.children}</h2>;
        case 'h3':
            return <h3 {...computedProperties}>{props.children}</h3>;
        case 'h4':
            return <h4 {...computedProperties}>{props.children}</h4>;
        case 'h6':
            return <h6 {...computedProperties}>{props.children}</h6>;
        default:
            return <label {...computedProperties}>{props.children}</label>;
    }
}

export default Label;
