import { useMemo } from 'react';
import FormControl from '../utils/componentUtils/formControl/formControl';
import { ControlMethod } from '../utils/componentUtils/formControl/controlMethods';

export default function useFormControl(...methods: [string, ControlMethod][]) {
    const formControl = useMemo(() => new FormControl(methods), [methods]);
    return formControl;
}

export function validate(
    key: string,
    method: ControlMethod
): [string, ControlMethod] {
    return [key, method];
}
