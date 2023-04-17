import React, { useMemo, useRef, useState } from 'react';
import './TextInput.scss';
import { computeProps } from '../../../../utils/componentUtils/propComputer';
import eyeOpen from '../../../../Images/Icons/eye-fill.svg';
import eyeSlash from '../../../../Images/Icons/eye-slash-fill.svg';

export interface TextInputProps {
    className?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    look?: 'primary' | 'secondary' | 'tertiary';
    required?: boolean;
    requireMessage?: string;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    formKey?: number;
    toggleVis?: boolean;
    placeholder?: string;
    name?: string;
}

function TextInput(props: React.PropsWithChildren<TextInputProps>) {
    const {
        className,
        type,
        look,
        required,
        requireMessage,
        formKey,
        onClick,
        onFocus,
        toggleVis,
        placeholder,
        name,
        ...etc
    } = props;
    
    const [validity, setValidity] = useState(true);
    const [eyeVis, setEyeVis] = useState(false);
    const inputRef = useRef(null);

    const computedClassName = useMemo(() => {
        let temp = ['TextInputInner'];
        if (look) temp.push(look);
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
        <>
            <div {...computeProps(etc)} className={'TextInput'}>
                <input
                    type={computedType}
                    className={computedClassName}
                    name={name}
                    data-isrequired={required ? '' : null}
                    placeholder={placeholder}
                    onInvalid={handleInvalid}
                    onClick={props.onClick}
                    onChange={props.onChange}
                    onFocus={props.onFocus}
                    data-formkey={formKey ?? -1}
                    ref={inputRef}
                />
                {renderToggleVisablity()}
            </div>
            <div className="invalidMessage">
                {props.children ??
                    '✷' + (requireMessage ?? 'Please fill out this field')}
            </div>
        </>
    );
}

export default TextInput;
