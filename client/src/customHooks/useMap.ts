import { set } from 'mongoose';
import { useCallback, useState } from 'react';

// K = Key, V = Value
export type MapOrEntries<K, V> = Map<K, V> | [K, V][];

export interface Actions<K, V> {
    size: number;
    get: (key: K) => V | undefined;
    has: (key: K) => boolean;
    keys: () => IterableIterator<K>;
    values: () => IterableIterator<V>;
    entries: () => IterableIterator<[K, V]>;
    forEach: (callback: (value: V, key: K, map: Map<K, V>) => void) => void;
    set: (key: K, value: V) => void;
    delete: (key: K) => void;
    clear: () => void;
    setAll: (entries: MapOrEntries<K, V>) => void;
    toArray: () => [K, V][];
}

/**
 * @summary A hook that provides a Map and its actions but with a more React-friendly API.
 * @summary calling {set, delete, clear} will update the state and cause a re-render.
 * @param entries The initial state of the Map.
 * @returns An object containing the Map and its actions.
 * @example
 * const { map, set, delete, clear } = useMap<string, number>([
 *    ['a', 1],
 *    ['b', 2],
 * ]);
 * @variation 2
 * @see {@link https://www.w3schools.com/jsref/jsref_map.asp}
 */
function useMap<K, V>(entries: MapOrEntries<K, V> = new Map()): Actions<K, V> {
    const [map, setMapState] = useState(new Map(entries));

    const actions: Actions<K, V> = {
        size: map.size,

        // Basic map methods
        get: useCallback((key) => map.get(key), [map]),

        has: useCallback((key) => map.has(key), [map]),

        keys: useCallback(() => map.keys(), [map]),

        values: useCallback(() => map.values(), [map]),

        entries: useCallback(() => map.entries(), [map]),

        forEach: useCallback((callback) => map.forEach(callback), [map]),

        // Extended methods
        set: useCallback((key, value) => {
            setMapState((prev) => {
                const copy = new Map(prev);
                copy.set(key, value);
                return copy;
            });
        }, []),

        delete: useCallback((key) => {
            setMapState((prev) => {
                const copy = new Map(prev);
                copy.delete(key);
                return copy;
            });
        }, []),

        clear: useCallback(() => {
            setMapState(() => new Map());
        }, []),

        setAll: useCallback((entries) => {
            setMapState(() => new Map(entries));
        }, []),

        toArray: useCallback(() => Array.from(map), [map]),
    };

    return actions;
}

export default useMap;
