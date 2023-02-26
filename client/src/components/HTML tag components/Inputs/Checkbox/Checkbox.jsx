import React, { useEffect, useState } from 'react';
import './Checkbox.scss';
import { computeProps } from '../../../../utils/componentUtils/propComputer';
import CheckmarkSVG from '../../../../../public/icons/checkmark.svg';

function Checkbox(props) {
    const {
        className,
        isChecked,
        childrenWhenChecked,
        childrenWhenUnchecked,
        onChange,
        ref,
        defaultBackground,
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

    const computedClassname =
        defaultBackground ?? true
            ? className
                ? `Checkbox ${className}`
                : 'Checkbox'
            : className
            ? `Checkbox exempt ${className}`
            : 'Checkbox exempt';
    return (
        <div
            {...computeProps(etc)}
            className={
                currentlyChecked
                    ? `${computedClassname} checked`
                    : `${computedClassname} unchecked`
            }
            onClick={handleClick}
        >
            {defaultBackground ?? true ? (
                <div className="checkboxInner">
                    {childrenWhenChecked && childrenWhenUnchecked ? (
                        currentlyChecked ? (
                            childrenWhenChecked
                        ) : (
                            childrenWhenUnchecked
                        )
                    ) : currentlyChecked ? (
                        <img src={CheckmarkSVG} alt="✓" />
                    ) : (
                        ''
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default Checkbox;
