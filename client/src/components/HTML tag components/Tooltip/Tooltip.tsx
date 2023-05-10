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
    props = { ...DEFAULT_TOOLTIP_PROPS, ...props };

    const tooltipRef = useRef<HTMLDivElement | null>(null);

    const computedClassname = useMemo(() => {
        let computed = 'Tooltip hidden';
        computed += ` ${props.look ?? 'standard'}`;
        if (props.className) computed += ` ${props.className}`;
        if (props.position) computed += ` ${props.position}`;
        if (props.interactive) computed += ` interactive`;
        return computed;
    }, [props.className, props.look, props.position, props.interactive]);

    const computedShowAnimationStyles = useMemo(() => {
        if (!props.showAnimation) return {};
        const { easingFunction, duration, delay, name } = props.showAnimation;
        const computed: React.CSSProperties = {
            animationDelay: '0ms',
            animationDuration: '500ms',
            animationTimingFunction: easingFunction,
            animationName: `${name}-${props.position}`,
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
    }, [props.showAnimation, props.position]);

    const computedHideAnimationStyles = useMemo(() => {
        if (!props.hideAnimation) return {};
        const { easingFunction, duration, delay, name } = props.hideAnimation;
        const computed: React.CSSProperties = {
            animationDelay: '0ms',
            animationDuration: '500ms',
            animationTimingFunction: easingFunction,
            animationName: `${name}-${props.position}`,
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
    }, [props.hideAnimation, props.position]);

    const computedStyles = useMemo(() => {
        const computedMaxWidth =
            (typeof props.maxWidth === 'number'
                ? `${props.maxWidth}px`
                : props.maxWidth) ?? 'none';

        const computed: React.CSSProperties = {
            ...props.style,
            backgroundColor: props.backgroundColor,
            color: props.textColor,
            maxWidth: computedMaxWidth,
        };
        return computed;
    }, [
        props.style,
        props.position,
        props.maxWidth,
        props.textColor,
        props.backgroundColor,
    ]);

    const showAnimationDistence = useMemo(() => {
        if (!props.showAnimation?.distance) return;
        const computedDistance =
            typeof props.showAnimation?.distance === 'number'
                ? `${props.showAnimation?.distance}px`
                : props.showAnimation?.distance;
        return computedDistance;
    }, [props.showAnimation?.distance]);

    const hideAnimationDistance = useMemo(() => {
        if (!props.hideAnimation?.distance) return;
        const computedDistance =
            typeof props.hideAnimation?.distance === 'number'
                ? `${props.hideAnimation?.distance}px`
                : props.hideAnimation?.distance;
        return computedDistance;
    }, [props.hideAnimation?.distance]);

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
        if (props.onShow) props.onShow();
        if (!props.showAnimation) {
            tooltipRef.current.classList.remove('hidden');
            if (props.onShowEnd) props.onShowEnd();
            return;
        }

        tooltipRef.current.style.setProperty(
            '--tooltip-shift-distance',
            hideAnimationDistance ?? '0px'
        );

        setCurrentAnimation('reset');
        tooltipRef.current.style.animationPlayState = 'paused';
        tooltipRef.current.offsetHeight;
        tooltipRef.current.style.animationPlayState = 'running';
        setCurrentAnimation('show');

        tooltipRef.current.classList.remove('hidden');
        tooltipRef.current.addEventListener(
            'animationend',
            () => {
                if (!tooltipRef.current) return;
                if (tooltipRef.current.style.animationDirection === 'reverse')
                    return;
                if (props.onShowEnd) props.onShowEnd();
            },
            {
                once: true,
            }
        );
    }, [props.showAnimation, props.onShow, props.onShowEnd]);

    const hideTooltip = useCallback(() => {
        if (!tooltipRef.current) return;
        if (props.onHide) props.onHide();
        if (!props.hideAnimation) {
            tooltipRef.current.classList.add('hidden');
            if (props.onHideEnd) props.onHideEnd();
            return;
        }

        tooltipRef.current.style.setProperty(
            '--tooltip-shift-distance',
            showAnimationDistence ?? '0px'
        );

        setCurrentAnimation('reset');
        tooltipRef.current.style.animationPlayState = 'paused';
        tooltipRef.current.offsetHeight;
        tooltipRef.current.style.animationPlayState = 'running';
        setCurrentAnimation('hide');

        tooltipRef.current.addEventListener(
            'animationend',
            () => {
                if (!tooltipRef.current) return;
                if (tooltipRef.current.style.animationDirection === 'normal')
                    return;
                tooltipRef.current.classList.add('hidden');
                if (props.onHideEnd) props.onHideEnd();
            },
            {
                once: true,
            }
        );
    }, [props.hideAnimation, props.onHide, props.onHideEnd]);

    useEffect(() => {
        if (!tooltipRef.current) return;
        setCurrentAnimation('reset');
        tooltipRef.current.addEventListener(TooltipEvents.SHOW, showTooltip);
        tooltipRef.current.addEventListener(TooltipEvents.HIDE, hideTooltip);
    }, [tooltipRef.current, showTooltip, hideTooltip]);

    useEffect(() => {
        if (props.onMount) props.onMount();
        return () => {
            if (props.onUnmount) props.onUnmount();
        };
    }, []);

    useEffect(() => {
        if (!tooltipRef.current) return;

        let tooltipWidth = tooltipRef.current.clientWidth;
        let tooltipHeight = tooltipRef.current.clientHeight;

        if (tooltipRef.current.classList.contains('hidden')) {
            tooltipRef.current.classList.remove('hidden');
            tooltipRef.current.offsetHeight;
            tooltipWidth = tooltipRef.current.clientWidth;
            tooltipHeight = tooltipRef.current.clientHeight;
            tooltipRef.current.classList.add('hidden');
        }

        let maxPointerSize = 50;
        if (props.position === 'top' || props.position === 'bottom') {
            maxPointerSize = (tooltipWidth / 2) * Math.SQRT2;
        } else if (props.position === 'left' || props.position === 'right') {
            maxPointerSize = (tooltipHeight / 2) * Math.SQRT2;
        }
        if (props.pointerSize || props.pointer === 'none') {
            let computedPointerSize = `${props.pointerSize}`;
            if (props.pointer === 'none') computedPointerSize = '0px';
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
        if (props.margin) {
            const computedMargin =
                typeof props.margin === 'number'
                    ? `${props.margin}px`
                    : props.margin;
            tooltipRef.current.style.setProperty(
                '--tooltip-margin',
                computedMargin
            );
        }
    }, [
        tooltipRef.current,
        props.pointerSize,
        props.margin,
        props.pointer,
        props.position,
    ]);

    return (
        <div
            style={{ ...computedStyles }}
            className={computedClassname}
            ref={(newRef) => {
                tooltipRef.current = newRef;
                if (typeof ref === 'function') ref(newRef);
                else if (ref) ref.current = newRef;
            }}
            onClick={props.onClick}
        >
            <div
                className={
                    props.pointer
                        ? `TooltipPointer ${props.pointer}`
                        : 'TooltipPointer'
                }
            />
            {props.content}
        </div>
    );
}

export default React.forwardRef(Tooltip);
