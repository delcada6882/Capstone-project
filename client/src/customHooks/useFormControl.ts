import { useMemo } from 'react';
import FormControl from '../utils/componentUtils/formControl/formControl';
import { ControlMethod } from '../utils/componentUtils/formControl/controlMethods';

/**
 * A custom hook that returns a form control object
 * @param methods takes any number of tuples of the form [key, controlMethod]
 * @returns a form a control object
 * @example
 * const formControl = useFormControl(
 *     ['email',
 *      (element) => {
 *        if (!emailRegex.test(element.value))
 *          return 'Invalid email';
 *      }],
 *     ['phone', (element) => {
 *       if (element.value.length !== 10)
 *          return 'Phone number should be 10 digits long';
 *       if(Number(element.value) !== NaN)
 *          return 'Should only contain numbers';
 *      }]
 * );
 */
export default function useFormControl(...methods: [string, ControlMethod][]) {
    const formControl = useMemo(() => new FormControl(methods), [methods]);
    return formControl;
}

/**
 * Combines multiple control methods into one as a tuple using a key
 * Useful for creating a tuple of a key and a control method to pass to useFormControl
 * @param key the key of the form element e.g. 'email'
 * @param methods takes any number of control methods and combines them into one
 * @returns a tuple of the key and the combined control method
 */
export function validate(
    key: string,
    ...methods: ControlMethod[]
): [string, ControlMethod] {
    const combinedMethod: ControlMethod = async (elem) => {
        for (const m of methods) {
            const error = await m(elem);
            if (error) return error;
        }
    };
    return [key, combinedMethod];
}
