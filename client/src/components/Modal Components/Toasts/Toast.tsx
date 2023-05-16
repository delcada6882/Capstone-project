import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import './Toast.scss';
import { UUID } from 'crypto';
import { ReactComponent as Icon } from '../../../Images/Icons/check-circle-fill.svg';
import { ReactComponent as Error } from '../../../Images/Icons/x-circle-fill.svg';
import { ReactComponent as Warning } from '../../../Images/Icons/exclamation-triangle-fill.svg';
import { ReactComponent as Info } from '../../../Images/Icons/info-circle-fill.svg';

export interface ToastContainerProps {
    toastId: UUID;
    duration?: number;
    type?: 'success' | 'error' | 'warning' | 'info';
    removeCallback: (toastId: UUID) => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMount?: (toastRef: HTMLDivElement | null) => void;
    onUnmount?: (toastRef: HTMLDivElement | null) => void;
}

function ToastContainer(props: PropsWithChildren<ToastContainerProps>) {
    const {
        type,
        duration,
        toastId,
        removeCallback,
        onClick,
        onMount,
        onUnmount,
    } = props;
    const progressRef = useRef<HTMLDivElement | null>(null);
    const toastRef = useRef<HTMLDivElement | null>(null);

    const handleRemoval = useCallback(() => {
        if (!toastRef.current) return;
        toastRef.current.classList.add('reset');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        toastRef.current.offsetHeight; // Trigger reflow to restart animation
        toastRef.current.classList.remove('reset');
        toastRef.current.classList.add('ani-remove');
        setTimeout(() => {
            if (onUnmount) onUnmount(toastRef.current);
            removeCallback(toastId);
        }, 600);
    }, [onUnmount, removeCallback, toastId]);

    const computedClassName = useMemo(() => {
        let className = 'Toast';
        if (onClick) className += ' hasClick';
        if (type ?? 'error') className += ` ${type ?? 'info'}`;
        return className;
    }, [onClick, type]);

    useEffect(() => {
        if (!progressRef.current || !toastRef.current) return;
        if (onMount) onMount(toastRef.current);
        if (duration !== undefined)
            progressRef.current.style.setProperty('--time', `${duration}ms`);
        progressRef.current.addEventListener('animationend', handleRemoval);
        toastRef.current.addEventListener('clearToasts', handleRemoval);
    }, [handleRemoval, duration, onMount]);

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
        <div className={computedClassName} ref={toastRef} onClick={onClick}>
            {renderIcon(type)}
            {props.children}
            <span className="progressBar">
                <div className="progressInner" ref={progressRef}></div>
            </span>
        </div>
    );
}

export default ToastContainer;
