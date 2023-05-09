import React from 'react';
import './Label.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';
import TooltipWrapper, {
    TooltipProperties,
    computeTooltipAriaLabel,
} from 'HTML_components/TooltipWrapper/TooltipWrapper';

export interface LabelProps {
    className?: string;
    type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h6';
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    id?: string;
    htmlFor?: string;
    style?: React.CSSProperties;
    tooltipProperties?: TooltipProperties;
}

function Label(props: React.PropsWithChildren<LabelProps>) {
    const {
        className,
        tooltipProperties,
        onClick,
        type,
        htmlFor,
        style,
        id,
        ...etc
    } = props;
    const computedProperties = {
        ...computeProps(etc),
        className: className ? `Label ${className}` : 'Label',
        onClick: props.onClick,
        id: id,
        style: style,
        htmlFor: htmlFor,
        'aria-label': computeTooltipAriaLabel(tooltipProperties),
    };

    const renderIndividualLabelType = (children: React.ReactNode) => {
        switch (type) {
            case 'p':
                return <p {...computedProperties}>{children}</p>;
            case 'h1':
                return <h1 {...computedProperties}>{children}</h1>;
            case 'h2':
                return <h2 {...computedProperties}>{children}</h2>;
            case 'h3':
                return <h3 {...computedProperties}>{children}</h3>;
            case 'h4':
                return <h4 {...computedProperties}>{children}</h4>;
            case 'h6':
                return <h6 {...computedProperties}>{children}</h6>;
            default:
                return <label {...computedProperties}>{children}</label>;
        }
    };

    if (!tooltipProperties) return renderIndividualLabelType(props.children);
    else if (tooltipProperties.wrapContents)
        return renderIndividualLabelType(
            <TooltipWrapper {...tooltipProperties}>
                {props.children}
            </TooltipWrapper>
        );
    else {
        return (
            <TooltipWrapper {...tooltipProperties}>
                {renderIndividualLabelType(props.children)}
            </TooltipWrapper>
        );
    }
}

export default Label;
