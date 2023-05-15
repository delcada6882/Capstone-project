import './TooltipWrapper.scss';
import React, { useEffect, useRef } from 'react';
import Tooltip, { TooltipProps } from '../Tooltip/Tooltip';
import useTimeout from '../../../customHooks/useTimeout';
import useClickOutside from '../../../customHooks/useClickOutside';
import {
    hideTooltip,
    showTooltip,
} from 'HTML_components/Tooltip/TooltipEvents';

export function computeTooltipAriaLabel(tooltipProperties?: TooltipProperties) {
    if (!tooltipProperties) return undefined;
    const { content, ariaLabel } = tooltipProperties;
    if (ariaLabel) return ariaLabel;
    if (!content) return undefined;

    if (typeof content === 'string') return content;
    if (content.toString() !== '[object Object]') return content.toString();
}

export interface TooltipProperties extends TooltipWrapperProps {
    wrapContents?: boolean; // Default is false
    ariaLabel?: string; // Default is undefined
}

export interface TooltipWrapperProps extends TooltipProps {
    onClickOutside?: (e: MouseEvent | TouchEvent) => void; // Default is undefined
    trigger?: 'hover' | 'click' | 'focus' | 'manual'; // Default is 'hover'
    tooltipRef?: React.RefObject<HTMLDivElement>; // Default is a new ref
    showDelay?: number; // Default is 400
    hideDelay?: number; // Default is 0
}

function TooltipWrapper(props: React.PropsWithChildren<TooltipWrapperProps>) {
    const {
        onClickOutside,
        trigger = 'hover',
        showDelay = 400,
        hideDelay = 0,
        tooltipRef,
        ...TooltipProps
    } = props;
    const target = useRef<HTMLDivElement>(tooltipRef?.current || null);

    const showTimeout = useTimeout(() => {
        if (!target.current) return;
        showTooltip(target.current);
        if (props.onShow) props.onShow();
    }, showDelay);

    const hideTimeout = useTimeout(() => {
        if (!target.current) return;
        hideTooltip(target.current);
        if (props.onHide) props.onHide();
    }, hideDelay);

    const wrapperRef = useClickOutside<HTMLDivElement>((event) => {
        if (props.onClickOutside) props.onClickOutside(event);
        if (trigger === 'click') startHidingTooltip();
    });

    useEffect(() => {
        showTimeout.clear();
        hideTimeout.clear();
    }, [showTimeout, hideTimeout]);

    function startShowingTooltip() {
        hideTimeout.clear();
        showTimeout.reset();
    }

    function startHidingTooltip() {
        showTimeout.clear();
        hideTimeout.reset();
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (trigger !== 'hover') return;
        startShowingTooltip();
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (trigger !== 'hover') return;
        startHidingTooltip();
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (trigger !== 'click') return;
        startShowingTooltip();
    };

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        if (trigger !== 'focus') return;
        startShowingTooltip();
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (trigger !== 'focus') return;
        startHidingTooltip();
    };

    return (
        <div
            className={'TooltipWrapper'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={wrapperRef}
        >
            {props.children}
            <Tooltip {...TooltipProps} ref={tooltipRef} />
        </div>
    );
}

export default TooltipWrapper;
