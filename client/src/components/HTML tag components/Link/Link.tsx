import React, {
    HTMLAttributeAnchorTarget,
    HTMLAttributeReferrerPolicy,
} from 'react';
import './Link.scss';
import { computeProps } from '../../../utils/componentUtils/propComputer';

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
        ...etc
    } = props;

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
        >
            {props.children}
        </a>
    );
}

export default Link;
