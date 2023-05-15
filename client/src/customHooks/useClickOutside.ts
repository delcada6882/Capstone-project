import { useEffect, useRef } from 'react';

/**
 * Custom hook that allows to detect clicks outside of a given element.
 * @param callback - Function to be called when a click outside of the element is detected.
 * @param ref - Ref to the element to be checked. If not provided, the hook will return a ref to the element that should be checked.
 * @returns A ref to the element that should be checked or null if a ref was provided.
 * @example
 * const ref = useClickOutside<HTMLDivElement>(() => console.log('Clicked outside!'));
 * return <div ref={ref}>Click outside of me!</div>;
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(() => console.log('Clicked outside!'), ref);
 * return <div ref={ref}>Click outside of me!</div>;
 */
export default function useClickOutside<GeneratedElemType extends Element>(
    callback: (event: MouseEvent | TouchEvent) => void,
    ref?: React.RefObject<Element>
): React.RefObject<GeneratedElemType> | null {
    const generatedRef = useRef<Element>(ref?.current ?? null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            if (ref) {
                if (ref.current && ref.current.contains(event.target as Node))
                    return;
            } else if (
                !generatedRef?.current ||
                generatedRef.current.contains(event.target as Node)
            )
                return;
            callback(event);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [generatedRef, callback, ref]);
    if (ref) return null;
    return generatedRef as React.RefObject<GeneratedElemType>;
}
