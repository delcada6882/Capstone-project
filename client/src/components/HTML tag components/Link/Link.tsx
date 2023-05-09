import React, {
    HTMLAttributeAnchorTarget,
    HTMLAttributeReferrerPolicy,
} from 'react';
import './Link.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';
import TooltipWrapper, {
    TooltipProperties,
    computeTooltipAriaLabel,
} from 'HTML_components/TooltipWrapper/TooltipWrapper';

export interface LinkProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    style?: React.CSSProperties;
    id?: string;

    // Anchor HTML attributes
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    ping?: string;
    target?: HTMLAttributeAnchorTarget;
    type?: string;
    referrerPolicy?: HTMLAttributeReferrerPolicy;

    tooltipProperties?: TooltipProperties;
}

function Link(props: React.PropsWithChildren<LinkProps>) {
    const {
        className,
        style,
        id,
        href,
        target,
        type,
        ping,
        media,
        hrefLang,
        download,
        referrerPolicy,
        tooltipProperties,
        ...etc
    } = props;

    const renderIndividualLink = (children: React.ReactNode) => {
        return (
            <a
                {...computeProps(etc)}
                className={className ? `Link ${className}` : 'Link'}
                id={id}
                style={style}
                onClick={props.onClick}
                download={download}
                href={href}
                hrefLang={hrefLang}
                media={media}
                ping={ping}
                target={target}
                type={type}
                referrerPolicy={referrerPolicy}
                aria-Label={computeTooltipAriaLabel(tooltipProperties)}
            >
                {props.children}
            </a>
        );
    };

    if (!tooltipProperties) return renderIndividualLink(props.children);
    else if (tooltipProperties.wrapContents)
        return renderIndividualLink(
            <TooltipWrapper {...tooltipProperties}>
                {props.children}
            </TooltipWrapper>
        );
    else
        return (
            <TooltipWrapper {...tooltipProperties}>
                {renderIndividualLink(props.children)}
            </TooltipWrapper>
        );
}

export default Link;
