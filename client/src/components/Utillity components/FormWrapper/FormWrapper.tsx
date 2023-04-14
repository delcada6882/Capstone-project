import React, { useEffect, useRef } from 'react';

function FormWrapper(props) {
    const submitHandler = (event) => {
        event.preventDefault();
        if (!formElems) hookupformElements(event.target);
        let retun = checkIfFormIsValid(event);
        if (retun) retun.focus();
        else if (props.onSubmit) props.onSubmit(formElems);
    };
    const formRef = useRef();
    let formElems;

    const checkFormKeys = (elems) => {
        if (elems[0].getAttribute('formkey') == -1) {
            let i = 0;
            for (const iter of elems)
                if (iter.hasAttribute('formkey')) {
                    iter.setAttribute('formkey', i);
                    i++;
                }
        }
    };

    const hookupformElements = (parent) => {
        checkFormKeys(parent);
        let temp = [];
        for (const iter of parent) {
            const attr = iter.getAttribute('formkey');
            if (attr != null && attr != '') temp[attr] = iter;
        }
        formElems = temp;
    };

    useEffect(() => {
        if (!formRef.current) return;
        hookupformElements(formRef.current);
    }, [formRef.current]);

    const checkIfFormIsValid = () => {
        let isSelected = formElems.indexOf(document.activeElement);

        if (isSelected < 0) {
            for (let i = 0; i < formElems.length; i++) {
                let elemer = formElems[i];
                if (elemer.hasAttribute('isrequired'))
                    if (elemer.value == '' || !elemer.checkValidity()) {
                        elemer.classList.add('invalid');
                        return elemer;
                    }
            }
            return false;
        }

        let elem = formElems[isSelected];
        if (elem.hasAttribute('isrequired'))
            if (elem.value == '') {
                elem.classList.add('invalid');
                return elem;
            }

        elem = formElems[isSelected + 1];
        if (elem) if (elem.value == '') return elem;

        for (let i = isSelected + 2; i < formElems.length; i++) {
            elem = formElems[i];
            if (elem.hasAttribute('isrequired'))
                if (elem.value == '' || !elem.checkValidity()) {
                    elem.classList.add('invalid');
                    return elem;
                }
        }
        for (let i = 0; i < isSelected; i++) {
            elem = formElems[i];
            if (elem.hasAttribute('isrequired'))
                if (elem.value == '' || !elem.checkValidity()) {
                    elem.classList.add('invalid');
                    return elem;
                }
        }
        return false;
    };

    const blurHandle = (e) => {
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
