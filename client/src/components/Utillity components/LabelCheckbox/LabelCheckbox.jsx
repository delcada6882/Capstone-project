import React, { useState } from 'react';
import Checkbox from '../../HTML tag components/Inputs/Checkbox/Checkbox';
import Label from '../../HTML tag components/Label/Label';

function LabelCheckbox(props) {
    const [checkState, setCheckState] = useState(props.isChecked ?? false);
    const handleToggleCheck = () => {
        setCheckState(curState => {
            return !curState
        })
    }
    return (
        <>
            <Checkbox
                isChecked={checkState}
                id={props.checkboxId}
                ref={props.checkboxRef}
                onChange={props.onChange}
                childrenWhenChecked={props.childrenWhenChecked}
                childrenWhenUnchecked={props.childrenWhenChecked}
                defaultBackground={props.defaultBackground}
                required={props.required}
                formKey={props.formKey}
            />
            <Label id={props.LabelId} onClick={handleToggleCheck}>{props.children}</Label>
        </>
    );
}

export default LabelCheckbox;
