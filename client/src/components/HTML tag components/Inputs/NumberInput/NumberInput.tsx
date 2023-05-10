import React, { useMemo, useState } from 'react';
import { InputProps } from '../InputProps';
import useMutationObserver from '../../../../customHooks/useMutationObserver';
import { FormkeyElement } from '../../../Utillity components/FormWrapper/FormWrapper';

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
    const divRef = React.useRef<HTMLDivElement>(null);

    const computedClassName = useMemo(() => {
        let temp = ['NumberInputInner'];
        if (look) temp.push(look);
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);

    useMutationObserver(
        divRef.current?.firstChild,
        (mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const elem = mutation.target as FormkeyElement;
                    setValidity(!elem.classList.contains('invalid'));
                }
            });
        },
        { attributes: true, attributeFilter: ['class'] }
    );

    const handleInvalid = () => {
        setValidity(false);
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) props.onChange(event);
        const newValue = event.target.value;
        setInputValue(newValue);

        // Form Control
        if (!control?.method) return;
        async function asyncValidateFormControl() {
            if (!control?.method) return;
            const inputElement = divRef.current?.firstChild as HTMLInputElement;
            const isValid = await control.method(inputElement);

            const formControl = control.formControl;
            if (!formControl) return;
            if (!formControl.elements.has(control.key))
                formControl.elements.set(control.key, inputElement);
            if (isValid !== undefined) {
                setValidity(false);
                setInvalidMessage(isValid);
            } else setValidity(true);
        }
        asyncValidateFormControl();
    };

    return (
        <div className="NumberInputWrapper">
            <div className={'NumberInput'} ref={divRef}>
                <input
                    {...etc}
                    type={'number'}
                    onClick={props.onClick}
                    onChange={changeHandler}
                    onInvalid={handleInvalid}
                    className={`${computedClassName}${
                        validity ? '' : ' invalid'
                    }}`}
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
