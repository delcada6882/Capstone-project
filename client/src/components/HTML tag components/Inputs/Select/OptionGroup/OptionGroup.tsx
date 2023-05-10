import Option, { OptionConstructor } from '../Option/Option';
import './OptionGroup.scss';
import React, { useEffect, useMemo } from 'react';
import useMap from '../../../../../customHooks/useMap';

export interface OptionGroupProps<T> {
    // Basic Props
    className?: string;
    // OptionGroup Props
    options: OptionConstructor[]; // Required
    multiple?: number;
    disabled?: boolean;
}

function OptionGroup(props: React.PropsWithChildren<OptionGroupProps<any>>) {
    const optionsMap = useMap<string, boolean>();

    useEffect(() => {
        optionsMap.setAll(
            new Map<string, boolean>(
                props.options.map(({ value, selected }) => [
                    value,
                    selected ?? false,
                ])
            )
        );
    }, [props.options]);

    const computedClassname = useMemo(() => {
        let className = 'OptionGroup';
        if (props.className) className += ` ${props.className}`;
        if (props.disabled) className += ` disabled`;
        return className;
    }, [props.className, props.disabled]);

    const renderOptions = () => {
        return props.options.map((option, index) => (
            <Option
                key={`Option-${index}`}
                value={option.value}
                label={option.label ?? option.value}
                clickCallback={(e, value) => {
                    const targetPair = optionsMap.get(value);
                    optionsMap.set(value, !targetPair);
                    return { selected: !targetPair };
                }}
            >
                {option.label ?? option.value}
            </Option>
        ));
    };

    return (
        <form
            onSubmit={(e: any) => {
                e.preventDefault();
                console.log(e.target.elements[0]);
                console.log(e.target.elements[0].getAttribute('data-value'));
            }}
            className={computedClassname}
        >
            {renderOptions()}
            <select
                name="test"
                data-value={optionsMap
                    .toArray()
                    .filter((val) => val[1])
                    .map((val) => val[0])
                    .join(',')}
            />
        </form>
    );
}

export default OptionGroup;
