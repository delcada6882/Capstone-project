import React, { useEffect, useRef } from 'react';
import './Toast.scss';

function ToastContainer({
    removeCallback,
    children,
    toastId,
    onClick,
    duration,
    onMount,
    onUnmount,
    ...etc
}) {
    const progressRef = useRef();
    const toastRef = useRef();

    const handleRemoval = () => {
        toastRef.current.classList.add('reset');
        toastRef.current.offsetHeight;
        toastRef.current.classList.remove('reset');
        toastRef.current.classList.add('ani-remove');
        setTimeout(() => {
            if (onUnmount) onUnmount(toastRef.current);
            removeCallback(toastId);
        }, 600);
    };

    useEffect(() => {
        if (onMount) onMount(toastRef.current);
        if (duration)
            progressRef.current.style.setProperty('--time', `${duration}ms`);
        progressRef.current.addEventListener('animationend', handleRemoval);
        toastRef.current.addEventListener('clearToasts', handleRemoval);
    }, []);

    return (
        <div
            className={`Toast${onClick ? ' hasClick' : ''}`}
            ref={toastRef}
            onClick={onClick}
            {...etc}
        >
            {children}
            <span className="progressBar" value="59" max="100">
                <div className="progressInner" ref={progressRef}></div>
            </span>
        </div>
    );
}

export default ToastContainer;
