import React from 'react';
import './Div.scss';
import {
    StyleProps,
    computeProps,
} from '../../../utils/componentUtils/propComputer';
import TooltipWrapper, {
    TooltipProperties,
} from 'HTML_components/TooltipWrapper/TooltipWrapper';

export interface DivProps extends StyleProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    tooltipProperties?: TooltipProperties;
}

function Div(
    props: React.PropsWithChildren<DivProps>,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const { className, onClick, tooltipProperties, ...etc } = props;

    const renderIndividualDiv = (children: React.ReactNode) => {
        return (
            <div
                {...computeProps(etc)}
                onClick={props.onClick}
                className={className ? `Div ${className}` : 'Div'}
                ref={ref}
            >
                {children}
            </div>
        );
    };

    if (!tooltipProperties) return renderIndividualDiv(props.children);
    else if (tooltipProperties.wrapContents)
        return renderIndividualDiv(
            <TooltipWrapper {...tooltipProperties}>
                {props.children}
            </TooltipWrapper>
        );
    else
        return (
            <TooltipWrapper {...tooltipProperties}>
                {renderIndividualDiv(props.children)}
            </TooltipWrapper>
        );
}

export default React.forwardRef(Div);
