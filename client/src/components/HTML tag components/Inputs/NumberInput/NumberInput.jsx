import React, { useMemo, useRef, useState } from 'react';
// import './NumberInput.scss';
import { computeProps } from '../../../../utils/componentUtils/propComputer';
import eyeOpen from '../../../../../public/icons/eye-fill.svg';
import eyeSlash from '../../../../../public/icons/eye-slash-fill.svg';

function NumberInput(props) {
    const {
        className,
        type,
        look,
        required,
        requireMessage,
        formKey,
        onClick,
        placeholder,
        name,
        innerRef,
        ...etc
    } = props;
    const [validity, setValidity] = useState(true);
    // const inputRef = useRef(null);

    const computedClassName = useMemo(() => {
        let temp = ['TextInputInner'];
        if (look) temp.push(look);
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);

    const computedType = useMemo(() => {
        return 'number';
    }, []);

    const handleInvalid = () => {
        setValidity(false);
    };

    const { style, ...rest } = { ...computeProps(etc) };

    return (
        <>
            <div className={'NumberInput'} style={style}>
                <input
                    {...rest}
                    onClick={onClick}
                    type={computedType}
                    className={computedClassName }
                    name={name}
                    isrequired={required ? '' : null}
                    onInvalid={handleInvalid}
                    placeholder={placeholder}
                    formkey={formKey ?? -1}
                    ref={innerRef}
                />
            </div>
            <div className="invalidMessage">
                {props.children ??
                    '✷' + (requireMessage ?? 'Please fill out this field')}
            </div>
        </>
    );
}

export default NumberInput;
