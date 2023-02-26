import React from 'react';
import Checkbox from '../../HTML tag components/Inputs/Checkbox/Checkbox';
import Label from '../../HTML tag components/Label/Label';

function LabelCheckbox(props) {
    return (
        <>
            <Checkbox
                isChecked={props.isChecked}
                id={props.checkboxId}
                ref={props.checkboxRef}
                onChange={props.onChange}
                childrenWhenChecked={props.childrenWhenChecked}
                childrenWhenUnchecked={props.childrenWhenChecked}
                defaultBackground={props.defaultBackground}
            />
            <Label id={props.LabelId}>{props.children}</Label>
        </>
    );
}

export default LabelCheckbox;
