import React, { PropsWithChildren, useEffect, useRef } from 'react';
import './Toast.scss';
import { UUID } from 'crypto';

export interface ToastContainerProps {
    removeCallback: (toastId: UUID) => void;
    toastId: UUID;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    duration?: number;
    onMount?: (toastRef: HTMLDivElement | null) => void;
    onUnmount?: (toastRef: HTMLDivElement | null) => void;
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

    useEffect(() => {
        if(!progressRef.current || !toastRef.current) return;
        if (props.onMount) props.onMount(toastRef.current);
        if (props.duration)
            progressRef.current.style.setProperty(
                '--time',
                `${props.duration}ms`
            );
        progressRef.current.addEventListener('animationend', handleRemoval);
        toastRef.current.addEventListener('clearToasts', handleRemoval);
    }, []);

    return (
        <div
            className={`Toast${props.onClick ? ' hasClick' : ''}`}
            ref={toastRef}
            onClick={props.onClick}
        >
            {props.children}
            <span className="progressBar">
                <div className="progressInner" ref={progressRef}></div>
            </span>
        </div>
    );
};

export default ToastContainer;
