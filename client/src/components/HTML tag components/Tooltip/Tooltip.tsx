import './Tooltip.scss';
import './TooltipLooks.scss';
import './TooltipAnimations.scss';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { AnimationProperties } from './TooltipTypes';
import { TooltipEvents } from './TooltipEvents';

export interface TooltipProps {
    // Required Props
    content: React.ReactNode; // Required
    // Basic Props
    className?: string; // Default is undefined
    style?: React.CSSProperties; // Default is none
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; // Default is undefined
    // Appearance Props
    textColor?: string; // Default is undefined
    backgroundColor?: string; // Default is undefined
    position?: 'top' | 'right' | 'bottom' | 'left'; // Default is 'top'
    look?:
        | 'standard'
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'outlined'
        | 'warning'
        | 'success'
        | 'error'
        | 'none'; // Default is 'standard'
    margin?: number | `${number}px` | `${number}%` | `${number}em`; // Default is '0px'
    maxWidth?: number | `${number}px` | `${number}%` | `${number}em`; // Default is 'none'
    pointerSize?: number | `${number}px` | `${number}%` | `${number}em`; // Default is '10px'
    pointer?: 'default' | 'round' | 'wide' | 'narrow' | 'none'; // Default is 'default'
    // Functionality Props
    interactive?: boolean; // Default is false
    onShow?: () => void; // Default is undefined
    onHide?: () => void; // Default is undefined
    onShowEnd?: () => void; // Default is undefined
    onHideEnd?: () => void; // Default is undefined
    onMount?: () => void; // Default is undefined
    onUnmount?: () => void; // Default is undefined
    // Animation Props
    showAnimation?: AnimationProperties; // Default is none
    hideAnimation?: AnimationProperties; // Default is none
}

function Tooltip(props: TooltipProps, ref: React.ForwardedRef<HTMLDivElement>) {
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

    useEffect(() => {
        if (!tooltipRef.current) return;
        let maxPointerSize = 50;
        if (props.position === 'top' || props.position === 'bottom') {
            maxPointerSize = (tooltipRef.current.clientWidth / 2) * Math.SQRT2;
        } else if (props.position === 'left' || props.position === 'right') {
            maxPointerSize = (tooltipRef.current.clientHeight / 2) * Math.SQRT2;
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
        // if (props.animation?.distance) {
        //     const computedAnimationDistance =
        //         typeof props.animation?.distance === 'number'
        //             ? `${props.animation?.distance}px`
        //             : props.animation?.distance;
        //     tooltipRef.current.style.setProperty(
        //         '--tooltip-shift-distance',
        //         computedAnimationDistance
        //     );
        // }
    }, [
        tooltipRef.current,
        props.pointerSize,
        props.margin,
        props.pointer,
        props.position,
    ]);

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

    useEffect(() => {
        if (!tooltipRef.current) return;
        if (props.onMount) props.onMount();
        setCurrentAnimation('reset');

        tooltipRef.current.addEventListener(TooltipEvents.SHOW, () => {
            if (!tooltipRef.current) return;
            if (props.onShow) props.onShow();
            if (!props.showAnimation) {
                tooltipRef.current.classList.remove('hidden');
                if (props.onShowEnd) props.onShowEnd();
                return;
            }
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
                    if (
                        tooltipRef.current.style.animationDirection ===
                        'reverse'
                    )
                        return;
                    if (props.onShowEnd) props.onShowEnd();
                },
                {
                    once: true,
                }
            );
        });

        tooltipRef.current.addEventListener(TooltipEvents.HIDE, () => {
            if (!tooltipRef.current) return;
            if (props.onHide) props.onHide();
            if (!props.hideAnimation) {
                tooltipRef.current.classList.add('hidden');
                if (props.onHideEnd) props.onHideEnd();
                return;
            }
            setCurrentAnimation('reset');
            tooltipRef.current.style.animationPlayState = 'paused';
            tooltipRef.current.offsetHeight;
            tooltipRef.current.style.animationPlayState = 'running';
            setCurrentAnimation('hide');

            tooltipRef.current.addEventListener(
                'animationend',
                () => {
                    if (!tooltipRef.current) return;
                    if (
                        tooltipRef.current.style.animationDirection === 'normal'
                    )
                        return;
                    tooltipRef.current.classList.add('hidden');
                    if (props.onHideEnd) props.onHideEnd();
                },
                {
                    once: true,
                }
            );
        });
        return () => {
            if (props.onUnmount) props.onUnmount();
        };
    }, [tooltipRef.current]);

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
