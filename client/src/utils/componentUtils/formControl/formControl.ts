import { FormkeyElement } from '../../../components/Utillity components/FormWrapper/FormWrapper';
import { ControlMethod } from './controlMethods';

export interface ElementControl {
    key: string;
    method?: ControlMethod;
    element?: FormkeyElement;
    value: string;
    formControl?: FormControl;
}

/**
 * A class that manages form controls
 * @param methods takes any number of tuples of the form [key, controlMethod]
 * @returns a form a control object
 * @example
 * const formControl = new FormControl(
 *    ['email',
 *    (element) => {
 *     if (!emailRegex.test(element.value))
 *        return 'Invalid email';
 *   }],
 */
export default class FormControl {
    public methods: Map<string, ControlMethod>;
    public elements: Map<string, FormkeyElement>;

    constructor(methods: [string, ControlMethod][]) {
        this.methods = new Map(methods);
        this.elements = new Map();
    }

    /**
     * Adds a new element to the form control
     * @param key the key of the form element e.g. 'email'
     * @returns an object with the key, value, method and formControl properties
     * @example
     *    <TextInput formControl={formControl.set('email')} />
     *    <TextInput formControl={formControl.set('phone')} />
     */
    public set(key: string): ElementControl {
        const newControl: ElementControl = {
            key: key,
            value: '',
            method: this.methods.get(key),
            formControl: this,
        };
        return newControl;
    }

    /**
     * gets the element with the given key
     * @param key a key of element whose was set in the same formControl class
     * @returns the element with the given key
     * @example
     *   const formControl = useFormControl(
     *      ['password', (element) => {
     *          if (element.value.length < 8)
     *              return 'Password should be at least 8 characters long';
     *      }],
     *      ['new-password', (element) => {
     *          if (element.value !== formControl.get('password')?.value)
     *              return 'Passwords do not match';
     *      }]
     *   );
     *   <TextInput formControl={formControl.set('password')} />
     *   <TextInput formControl={formControl.set('new-password')} />
     */
    public get(key: string): FormkeyElement | undefined {
        return this.elements.get(key);
    }

    /**
     * Runs method of a element from the given key
     * Adds the 'invalid' class to the element if the method returns a error message
     * @param key a key of element whose was set in the same formControl class
     */
    public async update(key: string): Promise<void> {
        const element = this.elements.get(key);
        if (!element) return;
        const method = this.methods.get(key);
        if (!method) return;
        const error = await method(element);
        if (error) element.classList.add('invalid');
        else element.classList.remove('invalid');
    }

    /**
     * Runs method of a element from the given key
     * @param key a key of element whose was set in the same formControl class
     * @returns the error message returned by the method or undefined if there is no error
     */
    public async checkIfValid(key: string): Promise<string | undefined> {
        const element = this.elements.get(key);
        if (!element) return;
        const method = this.methods.get(key);
        if (!method) return;
        const error = await method(element);
        return error;
    }

    /**
     * @param element An element that was set in the same formControl class
     * @returns the key of the given element undefined if the element is not in the formControl
     */
    public keyOfElement(element: Element): string | undefined {
        for (const entry of this.elements.entries()) {
            if (entry[1] === element) {
                return entry[0];
            }
        }
    }
}
