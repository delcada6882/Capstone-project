import React, { useMemo, useState } from 'react';
import InputProps from '../InputProps';

export interface NumberInputProps extends InputProps {
    className?: string;
    look?: 'primary' | 'secondary' | 'tertiary';
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    ref?: React.RefObject<HTMLInputElement>;
}

function NumberInput(props: React.PropsWithChildren<NumberInputProps>) {
    const { className, look, formKey, ref, control, required, ...etc } = props;
    const [validity, setValidity] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState(
        'Please fill out this field'
    );
    const [inputValue, setInputValue] = useState(control?.value ?? '');

    const computedClassName = useMemo(() => {
        let temp = ['NumberInputInner'];
        if (look) temp.push(look);
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);

    const handleInvalid = () => {
        setValidity(false);
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(event);
        const newValue = event.target.value;
        setInputValue(newValue);

        // Form Control
        if (!control?.method) return;
        const isValid = control.method(event.target);
        const formControl = control.formControl;
        if (formControl && !formControl.elements.has(control.key))
            formControl.elements.set(control.key, event.target);
        if (isValid !== undefined) {
            setValidity(false);
            setInvalidMessage(isValid);
        } else setValidity(true);
    };

    return (
        <div className="NumberInputWrapper">
            <div className={'NumberInput'}>
                <input
                    {...etc}
                    type={'number'}
                    onClick={props.onClick}
                    onChange={changeHandler}
                    onInvalid={handleInvalid}
                    className={computedClassName}
                    value={inputValue}
                    data-isrequired={required ? '' : null}
                    data-formkey={formKey ?? -1}
                    ref={ref}
                />
            </div>
            <label className="invalidMessage">{`✷${invalidMessage}`}</label>
        </div>
    );
}

export default NumberInput;
