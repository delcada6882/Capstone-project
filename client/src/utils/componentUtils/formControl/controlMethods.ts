import { FormkeyElement } from '../../../components/Utillity components/FormWrapper/FormWrapper';

export type ControlMethod = (elem: FormkeyElement) => string | undefined;

export interface ControlMethods {
    email: ControlMethod;
    match: ControlMethod;
    phone: ControlMethod;
}

export const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

const controlMethods: ControlMethods = {
    email: ({ value }) => {
        if (value === '') return 'Email is required';
        if (!emailRegex.test(value)) {
            return 'Invalid email';
        }
    },
    match: ({ value }) => {
        if (value === '') return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
    },
    phone: ({ value }) => {
        if (value === '') return 'Phone number is required';
        if (value.length !== 10) return 'Phone number should be 10 digits long';
    },
};

export default controlMethods;
