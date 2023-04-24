import { ElementControl } from '../../../utils/componentUtils/formControl/formControl';

export default interface InputProps {
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    max?: number;
    min?: number;
    maxLength?: number;
    minLength?: number;
    readOnly?: boolean;
    spellCheck?: boolean;
    step?: number;
    required?: boolean;
    formKey?: string;
    control?: ElementControl;
}
