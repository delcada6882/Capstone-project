import './Checkbox.scss';
import React, { useMemo, useRef, useState } from 'react';
import CheckmarkSVG from '../../../../Images/icons/checkmark.svg';
import useMutationObserver from '../../../../customHooks/useMutationObserver';
import { InputProps } from '../InputProps';
import { FormkeyElement } from '../../../Utillity components/FormWrapper/FormWrapper';
import Label from 'HTML_components/Label/Label';

export interface CheckboxProps extends InputProps {
    id?: string;
    className?: string;
    isChecked?: boolean;
    look?: 'primary' | 'secondary' | 'tertiary';
    childrenWhenChecked?: React.ReactNode;
    childrenWhenUnchecked?: React.ReactNode;
    ref?: React.RefObject<HTMLInputElement>;
    backgroundColor?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    label?: string;
}

function Checkbox(props: React.PropsWithChildren<CheckboxProps>) {
    const {
        id,
        className,
        isChecked,
        look,
        childrenWhenChecked,
        childrenWhenUnchecked,
        backgroundColor,
        ref,
        style,
        label,
        required,
        formKey,
        control,
        ...etc
    } = props;
    const [currentlyChecked, setCurrentlyChecked] = useState(
        isChecked ?? false
    );
    const [validity, setValidity] = useState(true);
    const divRef = useRef<HTMLDivElement>(null);
    const [invalidMessage, setInvalidMessage] = useState(
        'This has to be checked'
    );

    const computedClassName = useMemo(() => {
        let temp = ['checkboxInner'];
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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.onClick) props.onClick(e);
        setCurrentlyChecked((cur) => {
            if (required) setValidity(!cur);
            return !cur;
        });

        // Form Control
        if (!control?.method || !divRef.current) return;
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

    const renderInnerCheckbox = () => {
        if (currentlyChecked) {
            if (childrenWhenChecked) return childrenWhenChecked;
            return <img src={CheckmarkSVG} alt="Checkmark" />;
        } else {
            if (childrenWhenUnchecked) return childrenWhenUnchecked;
            return null;
        }
    };

    return (
        <div className="CheckboxWrapper">
            <div className="labelCheckbox">
                <div className={'Checkbox'} onClick={handleClick} ref={divRef}>
                    <input
                        {...etc}
                        className={`checkboxInput${validity ? '' : ' invalid'}`}
                        type="checkbox"
                        id={id}
                        readOnly
                        value={currentlyChecked ? 'checked' : 'unchecked'}
                        style={style}
                        checked={currentlyChecked}
                        data-isrequired={required ? '' : null}
                        data-formkey={formKey ?? -1}
                        ref={ref}
                    />
                    <div
                        style={{ backgroundColor: backgroundColor }}
                        className={`${computedClassName} ${
                            currentlyChecked ? 'checked' : 'unchecked'
                        }`}
                    >
                        {renderInnerCheckbox()}
                    </div>
                </div>
                {label && <Label htmlFor={id}>{label}</Label>}
            </div>
            <label className="invalidMessage">{`✷${invalidMessage}`}</label>
        </div>
    );
}

export default Checkbox;
