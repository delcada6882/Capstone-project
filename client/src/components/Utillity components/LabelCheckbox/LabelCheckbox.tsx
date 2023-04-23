import React, { useState } from 'react';
import Checkbox from 'HTML_components/Inputs/Checkbox/Checkbox';
import Label from 'HTML_components/Label/Label';

interface LabelCheckboxProps {
    checkboxId?: string;
    checkboxRef?: React.RefObject<HTMLInputElement>;
    LabelId?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    childrenWhenChecked?: React.ReactNode;
    childrenWhenUnchecked?: React.ReactNode;
    defaultBackground?: string;
    required?: boolean;
    formKey?: string;
    isChecked?: boolean;
}

function LabelCheckbox(props: React.PropsWithChildren<LabelCheckboxProps>) {
    const [checkState, setCheckState] = useState(props.isChecked ?? false);
    const handleToggleCheck = () => {
        setCheckState((curState) => {
            return !curState;
        });
    };
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
            <Label id={props.LabelId} onClick={handleToggleCheck}>
                {props.children}
            </Label>
        </>
    );
}

export default LabelCheckbox;
