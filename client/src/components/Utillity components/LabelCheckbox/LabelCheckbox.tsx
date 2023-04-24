import Checkbox, {
    CheckboxProps,
} from 'HTML_components/Inputs/Checkbox/Checkbox';

export interface LabelCheckboxProps extends CheckboxProps {
    label: string;
}

function LabelCheckbox(props: React.PropsWithChildren<LabelCheckboxProps>) {
    return <Checkbox {...props} />;
}

export default LabelCheckbox;
