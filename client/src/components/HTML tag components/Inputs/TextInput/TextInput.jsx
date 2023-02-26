import React, { useMemo, useState } from 'react';
import './TextInput.scss';
import { computeProps } from '../../../../utils/componentUtils/propComputer';

function TextInput(props) {
    const { className, type, look, required, requireMessage, onClick, placeholder, name, ...etc } = props;
    const [validity, setValidity] = useState(false);

    const computedClassName = useMemo(() => {
        let temp = ['TextInput'];
        if (look) temp.push(look);
        if (className) temp.push(className);
        return temp.join(' ');
    }, [look, className]);

    const handleInvalid = () => {
        setValidity(true);
    }

    return (
        <>
            <input
                {...computeProps(etc)}
                onClick={onClick}
                type={type}
                className={computedClassName}
                name={name}
                required={required}
                onInvalid={handleInvalid}
                placeholder={placeholder}
            >
                {props.children}
            </input>
            {validity ? <div className='invalidMessage'>✷{requireMessage ?? 'Please fill out this field'}</div> : null}
        </>
    );
}

export default TextInput;
