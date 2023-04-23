import React, { useMemo, useRef, useState } from 'react';
import './TextInput.scss';
import eyeOpen from '../../../../Images/Icons/eye-fill.svg';
import eyeSlash from '../../../../Images/Icons/eye-slash-fill.svg';
import InputProps from '../InputProps';

export interface TextInputProps extends InputProps {
    className?: string;
    type?: 'text' | 'password' | 'email' | 'tel' | 'url';
    look?: 'primary' | 'secondary' | 'tertiary';
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    toggleVis?: boolean;
    ref?: React.RefObject<HTMLInputElement>;
}

function TextInput(props: React.PropsWithChildren<TextInputProps>) {
    const {
        className,
        look,
        formKey,
        control,
        toggleVis,
        type,
        required,
        ...etc
    } = props;

    const [validity, setValidity] = useState(true);
    const [eyeVis, setEyeVis] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState(control?.value ?? '');
    const [invalidMessage, setInvalidMessage] = useState(
        'Please fill out this field'
    );

    const computedClassName = useMemo(() => {
        let temp = ['TextInputInner'];
        if (look) temp.push(look);
        if (!validity) temp.push('invalid');
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);

    const shouldRenderEyeVis = useMemo(() => {
        if (toggleVis == undefined) {
            if (type != 'password') return false;
        } else {
            if (!toggleVis) return false;
        }
        return true;
    }, [toggleVis, type]);

    const computedType = useMemo(() => {
        if (!shouldRenderEyeVis) return type ?? 'text';
        if (eyeVis) return 'text';
        return 'password';
    }, [eyeVis, shouldRenderEyeVis]);

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

    const handleInvalid = () => {
        setValidity(false);
    };

    const renderToggleVisablity = () => {
        if (!shouldRenderEyeVis) return null;
        return (
            <div className="toggleEye">
                <img
                    className="eyeImg"
                    src={eyeVis ? eyeSlash : eyeOpen}
                    onClick={toggleEyeVis}
                    alt="toggle"
                ></img>
            </div>
        );
    };

    const toggleEyeVis = () => {
        setEyeVis((curentVis) => {
            return !curentVis;
        });
    };

    return (
        <div className="TextInputWrapper">
            <div className={'TextInput'} ref={divRef}>
                <input
                    {...etc}
                    type={computedType}
                    className={`${computedClassName}${
                        validity ? '' : ' invalid'
                    }`}
                    data-isrequired={required ? '' : null}
                    data-formkey={formKey ?? -1}
                    onInvalid={handleInvalid}
                    onClick={props.onClick}
                    onChange={changeHandler}
                    value={inputValue}
                    ref={props.ref}
                />
                {renderToggleVisablity()}
            </div>
            <label className="invalidMessage">{`✷${invalidMessage}`}</label>
        </div>
    );
}

export default TextInput;
