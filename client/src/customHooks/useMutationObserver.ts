import { useEffect, useRef } from 'react';

/**
 * A custom hook that returns a mutation observer
 * @param target the target node to observe
 * @param callback the callback function to call when a mutation occurs
 * @param options the options to pass to the mutation observer
 * @returns void
 */
export default function useMutationObserver(
    target: Node | undefined | null,
    callback: MutationCallback,
    options?: MutationObserverInit
) {
    const observer = useRef<MutationObserver | null>(null);
    useEffect(() => {
        if (!target) return;
        observer.current = new MutationObserver(callback);
        observer.current.observe(target, options);
        return () => {
            observer.current?.disconnect();
        };
    }, [target, callback, options]);
}
