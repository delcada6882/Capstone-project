import React, { useEffect, useRef } from 'react';

export interface FormWrapperProps {
    className?: string;
    onSubmit?: (formElems: HTMLInputElement[]) => void;
}

function FormWrapper(props: React.PropsWithChildren<FormWrapperProps>) {
    const submitHandler = (event: any) => {
        event.preventDefault();
        if (!formElems) hookupformElements(event.target);
        let retun = checkIfFormIsValid();
        if (retun) retun.focus();
        else if (props.onSubmit) props.onSubmit(formElems);
    };
    const formRef = useRef<HTMLFormElement>(null);
    let formElems: HTMLInputElement[] = [];

    const checkFormKeys = (elems: HTMLElement[]) => {
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
        checkFormKeys([parent]);
        let temp: Element[] = [];
        for (const iter of parent) {
            const attr = iter.getAttribute('data-formkey');
            if (typeof attr == 'number') temp[attr] = iter;
        }
        formElems = temp as HTMLInputElement[];
    };

    useEffect(() => {
        if (!formRef.current) return;
        hookupformElements(formRef.current);
    }, [formRef.current]);

    const checkIfFormIsValid = () => {
        let isSelected = formElems.indexOf(
            document.activeElement as HTMLInputElement
        );

        if (isSelected < 0) {
            for (let i = 0; i < formElems.length; i++) {
                let elemer = formElems[i];
                if (elemer.hasAttribute('data-isrequired'))
                    if (elemer.value == '' || !elemer.checkValidity()) {
                        elemer.classList.add('invalid');
                        return elemer;
                    }
            }
            return false;
        }

        let elem = formElems[isSelected];
        if (elem.hasAttribute('data-isrequired'))
            if (elem.value == '') {
                elem.classList.add('invalid');
                return elem;
            }

        elem = formElems[isSelected + 1];
        if (elem) if (elem.value == '') return elem;

        for (let i = isSelected + 2; i < formElems.length; i++) {
            elem = formElems[i];
            if (elem.hasAttribute('data-isrequired'))
                if (elem.value == '' || !elem.checkValidity()) {
                    elem.classList.add('invalid');
                    return elem;
                }
        }
        for (let i = 0; i < isSelected; i++) {
            elem = formElems[i];
            if (elem.hasAttribute('data-isrequired'))
                if (elem.value == '' || !elem.checkValidity()) {
                    elem.classList.add('invalid');
                    return elem;
                }
        }
        return false;
    };

    const blurHandle = (e: React.FocusEvent<HTMLFormElement>) => {
        e.target.classList.remove('invalid');
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
