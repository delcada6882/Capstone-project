import { FormElementProps } from '../InputProps';
import { OptionConstructor } from './Option/Option';
import OptionGroup from './OptionGroup/OptionGroup';
import './Select.scss';
import React, { useId } from 'react';

export interface SelectProps<T> extends FormElementProps<T> {
    // Basic Props
    className?: string;
    id?: string;
    // Select Props
    title?: string;
    search?: boolean;
    options: OptionConstructor[]; // Required
    // HTML attributes
    size?: number;
    multiple?: boolean;
}

function Select(
    props: React.PropsWithChildren<
        SelectProps<HTMLSelectElement | HTMLDataListElement>
    >
) {
    const selectId = useId();

    const renderOptions = () => {
        return props.options.map((option, index) => (
            <option key={`Select-${index}`} value={option.value}>
                {option.label ?? option.value}
            </option>
        ));
    };

    const renderSelect = () => {
        return (
            <select
                autoFocus={props.autoFocus}
                id={selectId}
                size={props.size}
                multiple={props.multiple}
            >
                {renderOptions()}
            </select>
        );
    };

    const renderSearch = () => {
        return (
            <>
                <input list={selectId} size={props.size} />
                <OptionGroup options={props.options}></OptionGroup>
            </>
        );
    };

    return (
        <div
            className={props.className ? `Select ${props.className}` : `Select`}
            id={props.id}
        >
            {props.search ? renderSearch() : renderSelect()}
        </div>
    );
}

export default Select;
