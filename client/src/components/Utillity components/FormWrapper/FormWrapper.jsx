import React, { useEffect, useRef } from 'react';

function FormWrapper(props) {
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(event.target.elements);
        if (!formElems) hookupformElemsments(event.target);
        let retun = checkIfFormIsValid(event);
        if (retun) retun.focus();
        if (retun) retun.reportValidity();
        else if (props.onSubmit) props.onSubmit();
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

    const hookupformElemsments = (parent) => {
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
        hookupformElemsments(formRef.current);
    }, [formRef.current]);

    const checkIfFormIsValid = () => {
        let isSelected = Math.max(formElems.indexOf(document.activeElement), 0);

        let elem = formElems[isSelected];
        if (elem.hasAttribute('isrequired')) if (elem.value == '') return elem;

        elem = formElems[isSelected + 1];
        if (elem) if (elem.value == '') return elem;

        for (let i = isSelected + 2; i < formElems.length; i++) {
            elem = formElems[i];
            if (elem.hasAttribute('isrequired'))
                if (elem.value == '') return elem;
        }
        for (let i = 0; i < isSelected; i++) {
            elem = formElems[i];
            if (elem.hasAttribute('isrequired'))
                if (elem.value == '') return elem;
        }
        return false;
    };

    return (
        <form action="#" onSubmit={submitHandler} ref={formRef}>
            {props.children}
        </form>
    );
}
export default FormWrapper;
