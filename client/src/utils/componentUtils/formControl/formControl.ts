import { FormkeyElement } from '../../../components/Utillity components/FormWrapper/FormWrapper';
import { ControlMethod } from './controlMethods';

export interface ElementControl {
    key: string;
    method?: ControlMethod;
    element?: FormkeyElement;
    value: string;
    formControl?: FormControl;
}

export default class FormControl {
    public methods: Map<string, ControlMethod>;
    public elements: Map<string, FormkeyElement>;

    constructor(methods: [string, ControlMethod][]) {
        this.methods = new Map(methods);
        this.elements = new Map();
    }

    public set(key: string): ElementControl {
        const newControl: ElementControl = {
            key: key,
            value: '',
            method: this.methods.get(key),
            formControl: this,
        };
        return newControl;
    }

    public get(key: string): FormkeyElement | undefined {
        return this.elements.get(key);
    }

    public update(key: string): void {
        const element = this.elements.get(key);
        if (!element) return;
        const method = this.methods.get(key);
        if (!method) return;
        if (!method(element)) element.classList.remove('invalid');
        else element.classList.add('invalid');
    }

    public checkIfValid(key: string): ReturnType<ControlMethod> | undefined {
        const element = this.elements.get(key);
        if (!element) return;
        const method = this.methods.get(key);
        if (!method) return;
        return method(element);
    }

    public keyOfElement(element: Element): string | undefined {
        for (const entry of this.elements.entries()) {
            if (entry[1] === element) {
                return entry[0];
            }
        }
    }
}
