import { FormkeyElement } from '../../../components/Utillity components/FormWrapper/FormWrapper';

export type ControlMethod = (
    elem: FormkeyElement
) => Promise<string | undefined> | (string | undefined);

export interface ControlMethods {
    email: ControlMethod;
    phone: ControlMethod;
    minLength: (minLength: number) => ControlMethod;
    maxLength: (maxLength: number) => ControlMethod;
}

export const emailRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
);

const controlMethods: ControlMethods = {
    /**
     * Checks if the value of the element is a valid email
     * @returns if the value is a valid email using the regex
     *     ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$
     */
    email: ({ value }) => {
        if (!emailRegex.test(value)) return 'Invalid email';
    },
    /**
     * Checks if the value of the element is a valid phone number
     * @returns if the value if the value is at least 10 digits long and only contains numbers
     */
    phone: ({ value }) => {
        if (!isNaN(parseFloat(value)))
            return 'Phone number should only contain numbers';
        if (value.length !== 10) return 'Phone number should be 10 digits long';
    },
    /**
     * Checks if the value of the element is at least a certain length
     * @param minLength the minimum length of the value
     * @returns if the value is at least minLength characters long
     */
    minLength:
        (minLength) =>
        ({ value }) => {
            if (value.length < minLength)
                return `Must be at least ${minLength} characters long`;
        },
    /**
     * Checks if the value of the element is less than or equal to a certain length
     * @param maxLength the maximum length of the value
     * @returns if the value is at most maxLength characters long
     */
    maxLength:
        (maxLength) =>
        ({ value }) => {
            if (value.length > maxLength)
                return `Must be at most ${maxLength} characters long`;
        },
};

export default controlMethods;
