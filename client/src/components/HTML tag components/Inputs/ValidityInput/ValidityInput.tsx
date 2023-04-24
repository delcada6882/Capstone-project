import React from 'react';

export interface ValidityInputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    innerRef?: any;
    customValidity?: (e: any) => void;
}

class ValidityInput extends React.Component<ValidityInputProps, {}> {
    constructor(props: ValidityInputProps) {
        super(props);
        this.state = {};
    }
    checkValidity() {
        if (!this.props.customValidity) return;
        this.props.customValidity(this);
    }

    render(): React.ReactNode {
        return (
            <input {...this.props} ref={this.props.innerRef}>
                {this.props.children}
            </input>
        );
    }
}

export default React.forwardRef((props, ref) => (
    <ValidityInput {...props} innerRef={ref}></ValidityInput>
));
