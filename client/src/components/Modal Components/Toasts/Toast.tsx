import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import './Toast.scss';
import { UUID } from 'crypto';
import { ReactComponent as Icon } from '../../../Images/Icons/check-circle-fill.svg';
import { ReactComponent as Error } from '../../../Images/Icons/x-circle-fill.svg';
import { ReactComponent as Warning } from '../../../Images/Icons/exclamation-triangle-fill.svg';
import { ReactComponent as Info } from '../../../Images/Icons/info-circle-fill.svg';

export interface ToastContainerProps {
    removeCallback: (toastId: UUID) => void;
    toastId: UUID;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    duration?: number;
    onMount?: (toastRef: HTMLDivElement | null) => void;
    onUnmount?: (toastRef: HTMLDivElement | null) => void;
    type?: 'success' | 'error' | 'warning' | 'info';
}

function ToastContainer(props: PropsWithChildren<ToastContainerProps>) {
    const progressRef = useRef<HTMLDivElement | null>(null);
    const toastRef = useRef<HTMLDivElement | null>(null);

    const handleRemoval = () => {
        if (!toastRef.current) return;
        toastRef.current.classList.add('reset');
        toastRef.current.offsetHeight;
        toastRef.current.classList.remove('reset');
        toastRef.current.classList.add('ani-remove');
        setTimeout(() => {
            if (props.onUnmount) props.onUnmount(toastRef.current);
            props.removeCallback(props.toastId);
        }, 600);
    };

    const computedClassName = useMemo(() => {
        let className = 'Toast';
        if (props.onClick) className += ' hasClick';
        if (props.type ?? 'error') className += ` ${props.type ?? 'info'}`;
        return className;
    }, [props.onClick, props.type]);

    useEffect(() => {
        if (!progressRef.current || !toastRef.current) return;
        if (props.onMount) props.onMount(toastRef.current);
        if (props.duration !== undefined)
            progressRef.current.style.setProperty(
                '--time',
                `${props.duration}ms`
            );
        progressRef.current.addEventListener('animationend', handleRemoval);
        toastRef.current.addEventListener('clearToasts', handleRemoval);
    }, []);

    const renderIcon = (type?: 'success' | 'error' | 'warning' | 'info') => {
        const IconProps = {
            className: 'toastIcon',
        };
        switch (type) {
            case 'success':
                return <Icon {...IconProps} />;
            case 'error':
                return <Error {...IconProps} />;
            case 'warning':
                return <Warning {...IconProps} />;
            case 'info':
                return <Info {...IconProps} />;
            default:
                return <Info {...IconProps} />;
        }
    };

    return (
        <div
            className={computedClassName}
            ref={toastRef}
            onClick={props.onClick}
        >
            {renderIcon(props.type)}
            {props.children}
            <span className="progressBar">
                <div className="progressInner" ref={progressRef}></div>
            </span>
        </div>
    );
}

export default ToastContainer;
