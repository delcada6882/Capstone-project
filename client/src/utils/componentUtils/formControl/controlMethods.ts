import { FormkeyElement } from '../../../components/Utillity components/FormWrapper/FormWrapper';

export type ControlMethod = (elem: FormkeyElement) => string | undefined;

export interface ControlMethods {
    email: ControlMethod;
    phone: ControlMethod;
}

export const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

const controlMethods: ControlMethods = {
    email: ({ value }) => {
        if (!emailRegex.test(value)) {
            return 'Invalid email';
        }
    },
    phone: ({ value }) => {
        if (value.length !== 10) return 'Phone number should be 10 digits long';
    },
};

export default controlMethods;
