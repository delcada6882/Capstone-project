import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to set a timeout
 * @param callback - Callback function to be called after timeout
 * @param  ms - Delay in milliseconds
 * @returns {reset, clear} - reset function to reset the timeout and clear function to clear the timeout
 */
export default function useTimeout(callback: () => void, ms: number) {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(callbackRef.current, ms);
    }, [ms]);

    const clear = useCallback(() => {
        if (!timeoutRef.current) return;
        clearTimeout(timeoutRef.current);
    }, []);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        set();
        return clear;
    }, [ms, set, clear]);

    return {
        reset,
        clear,
    };
}
