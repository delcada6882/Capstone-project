import { ElementControl } from '../../../utils/componentUtils/formControl/formControl';
import { ChangeEventHandler } from 'react';

export interface FormElementProps<T> {
    formKey?: string;
    control?: ElementControl;
    // Standard HTML Attributes
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    autoFocus?: boolean | undefined;
    onChange?: ChangeEventHandler<T> | undefined;
}

export interface InputProps extends FormElementProps<HTMLInputElement> {
    name?: string;
    placeholder?: string;
    value?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    max?: number;
    min?: number;
    maxLength?: number;
    minLength?: number;
    readOnly?: boolean;
    spellCheck?: boolean;
    step?: number;
}
