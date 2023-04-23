import React, { useEffect, useMemo, useState } from 'react';
import './Checkbox.scss';
import { computeProps } from '../../../../utils/componentUtils/propComputer';
import CheckmarkSVG from '../../../../Images/icons/checkmark.svg';

function Checkbox(props) {
    const {
        className,
        isChecked,
        childrenWhenChecked,
        childrenWhenUnchecked,
        onChange,
        name,
        ref,
        formKey,
        defaultBackground,
        required,
        ...etc
    } = props;
    const [currentlyChecked, setCurrentlyChecked] = useState(false);

    const handleClick = () => {
        setCurrentlyChecked((cur) => {
            if (onChange) onChange(!cur);
            return !cur;
        });
    };

    useEffect(() => {
        if (isChecked != undefined) setCurrentlyChecked(isChecked);
    }, [isChecked]);

    const computedClassname = useMemo(() => {
        let temp = 'Checkbox';
        if (!(defaultBackground ?? true)) temp += ' exempt';
        if (className) temp += ` ${className}`;
        return temp;
    }, [className, defaultBackground]);

    const renderInnerCheckbox = () => {
        if (defaultBackground ?? true)
            if (childrenWhenChecked && childrenWhenUnchecked) {
                if (currentlyChecked) return childrenWhenChecked;
                childrenWhenUnchecked;
            } else if (currentlyChecked)
                return <img src={CheckmarkSVG} alt="✓" />;
        return null;
    };

    return (
        <div
            {...computeProps(etc)}
            className={
                currentlyChecked
                    ? `${computedClassname} checked`
                    : `${computedClassname} unchecked`
            }
            onClick={handleClick}
            isrequired={required ? '' : null}
        >
            <input
                type="checkbox"
                name={name}
                className={computedClassname}
                checked={currentlyChecked}
                style={{ display: 'none', visibility: 'hidden' }}
                readOnly
                formkey={formKey ?? null}
            />
            <div className="checkboxInner">{renderInnerCheckbox()}</div>
        </div>
    );
}

export default Checkbox;
