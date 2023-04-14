import React, { useMemo, useRef, useState } from 'react';
import './TextInput.scss';
import { computeProps } from '../../../../utils/componentUtils/propComputer';
import eyeOpen from '../../../../../public/icons/eye-fill.svg';
import eyeSlash from '../../../../../public/icons/eye-slash-fill.svg';

function TextInput(props) {
    const {
        className,
        type,
        look,
        required,
        requireMessage,
        formKey,
        onClick,
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
                    src={eyeVis ? eyeOpen : eyeSlash}
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

    const { style, ...rest } = { ...computeProps(etc) };

    return (
        <>
            <div className={'TextInput'} style={style}>
                <input
                    {...rest}
                    onClick={onClick}
                    type={computedType}
                    className={computedClassName}
                    name={name}
                    isrequired={required ? '' : null}
                    onInvalid={handleInvalid}
                    placeholder={placeholder}
                    formkey={formKey ?? -1}
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
