import './Tooltip.scss';
import './TooltipLooks.scss';
import './TooltipAnimations.scss';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AnimationProperties } from './TooltipTypes';
import { TooltipEvents } from './TooltipEvents';
import { DEFAULT_TOOLTIP_PROPS } from './TooltipDefaults';

export interface TooltipProps {
    // Required Props
    content: React.ReactNode;
    // Basic Props
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    // Appearance Props
    textColor?: string;
    backgroundColor?: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
    look?:
        | 'standard'
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'outlined'
        | 'warning'
        | 'success'
        | 'error'
        | 'none';
    margin?: number | `${number}px` | `${number}%` | `${number}em`;
    maxWidth?: number | `${number}px` | `${number}%` | `${number}em` | 'none';
    pointerSize?: number | `${number}px` | `${number}%` | `${number}em`;
    pointer?: 'default' | 'round' | 'wide' | 'narrow' | 'none';
    // Functionality Props
    interactive?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    onShowEnd?: () => void;
    onHideEnd?: () => void;
    onMount?: () => void;
    onUnmount?: () => void;
    // Animation Props
    showAnimation?: AnimationProperties;
    hideAnimation?: AnimationProperties;
}

function Tooltip(props: TooltipProps, ref: React.ForwardedRef<HTMLDivElement>) {
    props = { ...DEFAULT_TOOLTIP_PROPS, ...props }; // Merge default props with user props
    const {
        content,
        className,
        style,
        onClick,
        textColor,
        backgroundColor,
        position,
        look,
        margin,
        maxWidth,
        pointerSize,
        pointer,
        interactive,
        onShow,
        onHide,
        onShowEnd,
        onHideEnd,
        onMount,
        onUnmount,
        showAnimation,
        hideAnimation,
    } = props;

    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const computedClassname = useMemo(() => {
        let computed = 'Tooltip hidden';
        computed += ` ${look ?? 'standard'}`;
        if (className) computed += ` ${className}`;
        if (position) computed += ` ${position}`;
        if (interactive) computed += ` interactive`;
        return computed;
    }, [className, look, position, interactive]);

    const computedShowAnimationStyles = useMemo(() => {
        if (!showAnimation) return {};
        const { easingFunction, duration, delay, name } = showAnimation;
        const computed: React.CSSProperties = {
            animationDelay: '0ms',
            animationDuration: '500ms',
            animationTimingFunction: easingFunction,
            animationName: `${name}-${position}`,
        };
        if (easingFunction === 'bounce')
            computed.animationTimingFunction =
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        if (easingFunction === 'elastic')
            computed.animationTimingFunction =
                'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        if (delay !== undefined)
            if (typeof delay === 'number')
                computed.animationDelay = `${delay}ms`;
            else computed.animationDelay = delay;
        if (duration !== undefined)
            if (typeof duration === 'number')
                computed.animationDuration = `${duration}ms`;
            else computed.animationDuration = duration;

        return computed;
    }, [showAnimation, position]);

    const computedHideAnimationStyles = useMemo(() => {
        if (!hideAnimation) return {};
        const { easingFunction, duration, delay, name } = hideAnimation;
        const computed: React.CSSProperties = {
            animationDelay: '0ms',
            animationDuration: '500ms',
            animationTimingFunction: easingFunction,
            animationName: `${name}-${position}`,
        };
        if (easingFunction === 'bounce')
            computed.animationTimingFunction =
                'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        if (easingFunction === 'elastic')
            computed.animationTimingFunction =
                'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        if (delay !== undefined)
            if (typeof delay === 'number')
                computed.animationDelay = `${delay}ms`;
            else computed.animationDelay = delay;
        if (duration !== undefined)
            if (typeof duration === 'number')
                computed.animationDuration = `${duration}ms`;
            else computed.animationDuration = duration;

        return computed;
    }, [hideAnimation, position]);

    const computedStyles = useMemo(() => {
        const computedMaxWidth =
            (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) ??
            'none';

        const computed: React.CSSProperties = {
            ...style,
            backgroundColor: backgroundColor,
            color: textColor,
            maxWidth: computedMaxWidth,
        };
        return computed;
    }, [style, maxWidth, textColor, backgroundColor]);

    const showAnimationDistence = useMemo(() => {
        if (!showAnimation?.distance) return;
        const computedDistance =
            typeof showAnimation?.distance === 'number'
                ? `${showAnimation?.distance}px`
                : showAnimation?.distance;
        return computedDistance;
    }, [showAnimation?.distance]);

    const hideAnimationDistance = useMemo(() => {
        if (!hideAnimation?.distance) return;
        const computedDistance =
            typeof hideAnimation?.distance === 'number'
                ? `${hideAnimation?.distance}px`
                : hideAnimation?.distance;
        return computedDistance;
    }, [hideAnimation?.distance]);

    const setCurrentAnimation = useCallback(
        (animation: 'hide' | 'show' | 'reset') => {
            if (!tooltipRef.current) return;
            if (animation === 'show') {
                tooltipRef.current.style.animationName =
                    computedShowAnimationStyles.animationName ?? '';
                tooltipRef.current.style.animationDelay =
                    computedShowAnimationStyles.animationDelay ?? '';
                tooltipRef.current.style.animationDuration =
                    computedShowAnimationStyles.animationDuration ?? '';
                tooltipRef.current.style.animationTimingFunction =
                    computedShowAnimationStyles.animationTimingFunction ?? '';
                tooltipRef.current.style.animationDirection = 'normal';
            } else if (animation === 'hide') {
                tooltipRef.current.style.animationName =
                    computedHideAnimationStyles.animationName ?? '';
                tooltipRef.current.style.animationDelay =
                    computedHideAnimationStyles.animationDelay ?? '';
                tooltipRef.current.style.animationDuration =
                    computedHideAnimationStyles.animationDuration ?? '';
                tooltipRef.current.style.animationTimingFunction =
                    computedHideAnimationStyles.animationTimingFunction ?? '';
                tooltipRef.current.style.animationDirection = 'reverse';
            } else {
                tooltipRef.current.style.animation = 'none';
            }
        },
        [computedShowAnimationStyles, computedHideAnimationStyles]
    );

    const showTooltip = useCallback(() => {
        if (!tooltipRef.current) return;
        if (onShow) onShow();
        if (!showAnimation) {
            tooltipRef.current.classList.remove('hidden');
            if (onShowEnd) onShowEnd();
            return;
        }

        tooltipRef.current.style.setProperty(
            '--tooltip-shift-distance',
            hideAnimationDistance ?? '0px'
        );

        setCurrentAnimation('reset');
        tooltipRef.current.style.animationPlayState = 'paused';
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        tooltipRef.current.offsetHeight; // Trigger a reflow, flushing the CSS changes
        tooltipRef.current.style.animationPlayState = 'running';
        setCurrentAnimation('show');

        tooltipRef.current.classList.remove('hidden');
        tooltipRef.current.addEventListener(
            'animationend',
            () => {
                if (!tooltipRef.current) return;
                if (tooltipRef.current.style.animationDirection === 'reverse')
                    return;
                if (onShowEnd) onShowEnd();
            },
            {
                once: true,
            }
        );
    }, [
        showAnimation,
        hideAnimationDistance,
        onShow,
        onShowEnd,
        setCurrentAnimation,
    ]);

    const hideTooltip = useCallback(() => {
        if (!tooltipRef.current) return;
        if (onHide) onHide();
        if (!hideAnimation) {
            tooltipRef.current.classList.add('hidden');
            if (onHideEnd) onHideEnd();
            return;
        }

        tooltipRef.current.style.setProperty(
            '--tooltip-shift-distance',
            showAnimationDistence ?? '0px'
        );

        setCurrentAnimation('reset');
        tooltipRef.current.style.animationPlayState = 'paused';
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        tooltipRef.current.offsetHeight; // force reflow
        tooltipRef.current.style.animationPlayState = 'running';
        setCurrentAnimation('hide');

        tooltipRef.current.addEventListener(
            'animationend',
            () => {
                if (!tooltipRef.current) return;
                if (tooltipRef.current.style.animationDirection === 'normal')
                    return;
                tooltipRef.current.classList.add('hidden');
                if (onHideEnd) onHideEnd();
            },
            {
                once: true,
            }
        );
    }, [
        hideAnimation,
        showAnimationDistence,
        setCurrentAnimation,
        onHide,
        onHideEnd,
    ]);

    useEffect(() => {
        if (!tooltipRef.current) return;
        setCurrentAnimation('reset');
        tooltipRef.current.addEventListener(TooltipEvents.SHOW, showTooltip);
        tooltipRef.current.addEventListener(TooltipEvents.HIDE, hideTooltip);
    }, [setCurrentAnimation, showTooltip, hideTooltip]);

    useEffect(() => {
        if (onMount) onMount();
        return () => {
            if (onUnmount) onUnmount();
        };
    }, [onMount, onUnmount]);

    useEffect(() => {
        if (!tooltipRef.current) return;

        let tooltipWidth = tooltipRef.current.clientWidth;
        let tooltipHeight = tooltipRef.current.clientHeight;

        if (tooltipRef.current.classList.contains('hidden')) {
            tooltipRef.current.classList.remove('hidden');
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            tooltipRef.current.offsetHeight; // force reflow
            tooltipWidth = tooltipRef.current.clientWidth;
            tooltipHeight = tooltipRef.current.clientHeight;
            tooltipRef.current.classList.add('hidden');
        }

        let maxPointerSize = 50;
        if (position === 'top' || position === 'bottom') {
            maxPointerSize = (tooltipWidth / 2) * Math.SQRT2;
        } else if (position === 'left' || position === 'right') {
            maxPointerSize = (tooltipHeight / 2) * Math.SQRT2;
        }
        if (pointerSize || pointer === 'none') {
            let computedPointerSize = `${pointerSize}`;
            if (pointer === 'none') computedPointerSize = '0px';
            if (computedPointerSize.includes('%')) {
                computedPointerSize = `${
                    maxPointerSize *
                    Math.min(parseInt(computedPointerSize) / 100, 1)
                }px`;
            } else if (computedPointerSize.includes('em')) {
                computedPointerSize = `${Math.min(
                    parseInt(computedPointerSize) * 16,
                    maxPointerSize
                )}px`;
            } else {
                computedPointerSize = `${Math.min(
                    parseInt(computedPointerSize),
                    maxPointerSize
                )}px`;
            }

            tooltipRef.current.style.setProperty(
                '--tooltip-pointer-size',
                `${computedPointerSize}`
            );
        }
        if (margin) {
            const computedMargin =
                typeof margin === 'number' ? `${margin}px` : margin;
            tooltipRef.current.style.setProperty(
                '--tooltip-margin',
                computedMargin
            );
        }
    }, [pointerSize, margin, pointer, position]);

    return (
        <div
            style={{ ...computedStyles }}
            className={computedClassname}
            ref={(newRef) => {
                tooltipRef.current = newRef;
                if (typeof ref === 'function') ref(newRef);
                else if (ref) ref.current = newRef;
            }}
            onClick={onClick}
        >
            <div
                className={
                    pointer ? `TooltipPointer ${pointer}` : 'TooltipPointer'
                }
            />
            {content}
        </div>
    );
}

export default React.forwardRef(Tooltip);
