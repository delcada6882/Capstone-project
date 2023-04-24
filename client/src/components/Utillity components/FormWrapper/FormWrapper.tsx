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

    const submitHandler = async (event: any) => {
        event.preventDefault();
        if (!formElems) hookupformElements(event.target);
        const ShouldFocusNext = await checkIfFormIsValid();
        if (ShouldFocusNext) focusElement(ShouldFocusNext);
        else if (props.onSubmit) props.onSubmit(formElems);
    };

    const focusElement = async (elem: FormkeyElement) => {
        const doesNotFocus = ['checkbox', 'radio'];
        if (doesNotFocus.includes(elem.type)) {
            if (await checkIfVaild(elem)) elem.classList.remove('invalid');
            else elem.classList.add('invalid');
            return;
        }
        elem.focus();
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

    const checkIfFormIsValid = async () => {
        const isSelected = formElems.indexOf(
            document.activeElement as FormkeyElement
        );
        if (isSelected < 0) {
            for (let i = 0; i < formElems.length; i++) {
                let elemer = formElems[i];
                if (!(await checkIfVaild(elemer))) {
                    elemer.classList.add('invalid');
                    return elemer;
                }
            }
            return false;
        }

        let elem = formElems[isSelected];
        if (!(await checkIfVaild(elem))) {
            elem.classList.add('invalid');
            return elem;
        } else elem.classList.remove('invalid');

        elem = formElems[isSelected + 1];
        if (elem) if (!(await checkIfVaild(elem))) return elem;

        for (let i = isSelected + 2; i < formElems.length; i++) {
            elem = formElems[i];
            if (!(await checkIfVaild(elem))) {
                elem.classList.add('invalid');
                return elem;
            }
        }
        for (let i = 0; i < isSelected; i++) {
            elem = formElems[i];
            if (!(await checkIfVaild(elem))) {
                elem.classList.add('invalid');
                return elem;
            }
        }
        return false;
    };

    const blurHandle = async (e: React.FocusEvent<HTMLFormElement>) => {
        if (await checkIfVaild(e.target)) e.target.classList.remove('invalid');
        else e.target.classList.add('invalid');
    };

    const checkIfVaild = async (target: HTMLFormElement | FormkeyElement) => {
        if (props.formControl) {
            const keyOfTarget = props.formControl.keyOfElement(target);
            if (
                keyOfTarget &&
                (await props.formControl.checkIfValid(keyOfTarget))
            )
                return false;
        }
        if (!target.hasAttribute('data-isrequired')) return true;
        if ('checked' in target && target.type === 'checkbox')
            return target.checked && target.checkValidity();
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
