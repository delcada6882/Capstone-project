import './Option.scss';
import React, { useMemo } from 'react';

export interface OptionConstructor {
    value: string;
    label?: React.ReactNode;
    disabled?: boolean;
    selected?: boolean;
}

export interface OptionProps extends OptionConstructor {
    clickCallback?: (
        e: React.MouseEvent<HTMLDivElement>,
        optionValue: string
    ) => Partial<OptionConstructor> | void;
}

function Option(props: React.PropsWithChildren<OptionProps>) {
    const { disabled, selected, value, label } = props;
    const [selectedState, setSelectedState] = React.useState<boolean>(
        !!selected
    );
    const [disabledState, setDisabledState] = React.useState<boolean>(
        !!disabled
    );

    const computedClassname = useMemo(() => {
        let className = 'Option';
        if (disabledState) className += ' disabled';
        if (selectedState) className += ' selected';
        return className;
    }, [selectedState, disabledState]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (!props.clickCallback) return;
        const updatedValues = props.clickCallback(e, value);
        if (!updatedValues) return;
        if (updatedValues.selected !== undefined)
            setSelectedState((prev) => updatedValues.selected ?? prev);
        if (updatedValues.disabled !== undefined)
            setDisabledState((prev) => updatedValues.disabled ?? prev);
    };

    return (
        <div className={computedClassname} onClick={handleClick}>
            {label ?? props.children}
        </div>
    );
}

export default Option;
