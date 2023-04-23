import React, { useEffect, useRef } from 'react';
import FormControl from '../../../utils/componentUtils/formControl/formControl';

export interface FormWrapperProps {
    className?: string;
    onSubmit?: (formElems: FormkeyElement[]) => void;
    formControl?: FormControl;
}

export type FormkeyElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

function FormWrapper(props: React.PropsWithChildren<FormWrapperProps>) {
    const formRef = useRef<HTMLFormElement>(null);
    let formElems: FormkeyElement[] = [];

    useEffect(() => {
        if (!formRef.current) return;
        hookupformElements(formRef.current);
    }, [formRef.current]);

    const submitHandler = (event: any) => {
        event.preventDefault();
        if (!formElems) hookupformElements(event.target);
        const ShouldFocusNext = checkIfFormIsValid();
        if (ShouldFocusNext) ShouldFocusNext.focus();
        else if (props.onSubmit) props.onSubmit(formElems);
    };

    const checkFormKeys = (elems: HTMLFormControlsCollection) => {
        if (elems[0].getAttribute('data-formkey') === '-1') {
            let i = 0;
            for (const iter of elems)
                if (iter.hasAttribute('data-formkey')) {
                    iter.setAttribute('data-formkey', String(i));
                    i++;
                }
        }
    };

    const hookupformElements = (parent: HTMLFormElement) => {
        checkFormKeys(parent.elements);
        let temp: Element[] = [];
        for (const iter of parent.elements) {
            if (iter.hasAttribute('data-formkey')) {
                const attr = Number(iter.getAttribute('data-formkey'));
                if (attr !== null) temp[attr] = iter;
            }
        }
        formElems = temp as FormkeyElement[];
    };

    const checkIfFormIsValid = () => {
        const isSelected = formElems.indexOf(
            document.activeElement as FormkeyElement
        );
        if (isSelected < 0) {
            for (let i = 0; i < formElems.length; i++) {
                let elemer = formElems[i];
                if (!checkIfVaild(elemer)) {
                    elemer.classList.add('invalid');
                    return elemer;
                }
            }
            return false;
        }

        let elem = formElems[isSelected];
        if (!checkIfVaild(elem)) {
            elem.classList.add('invalid');
            return elem;
        } else elem.classList.remove('invalid');

        elem = formElems[isSelected + 1];
        if (elem) if (!checkIfVaild(elem)) return elem;

        for (let i = isSelected + 2; i < formElems.length; i++) {
            elem = formElems[i];
            if (!checkIfVaild(elem)) {
                elem.classList.add('invalid');
                return elem;
            }
        }
        for (let i = 0; i < isSelected; i++) {
            elem = formElems[i];
            if (!checkIfVaild(elem)) {
                elem.classList.add('invalid');
                return elem;
            }
        }
        return false;
    };

    const blurHandle = (e: React.FocusEvent<HTMLFormElement>) => {
        if (checkIfVaild(e.target)) e.target.classList.remove('invalid');
    };

    const checkIfVaild = (target: HTMLFormElement | FormkeyElement) => {
        if (props.formControl) {
            const keyOfTarget = props.formControl.keyOfElement(target);
            if (keyOfTarget && props.formControl.checkIfValid(keyOfTarget))
                return false;
        }
        if (!target.hasAttribute('data-isrequired')) return true;
        return target.value !== '' && target.checkValidity();
    };

    return (
        <form
            action="#"
            onSubmit={submitHandler}
            ref={formRef}
            onBlur={blurHandle}
        >
            {props.children}
        </form>
    );
}
export default FormWrapper;
