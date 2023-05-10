import './register.scss';
import Button from 'HTML_components/Button/Button';
import Div from 'HTML_components/Div/Div';
import TextInput from 'HTML_components/Inputs/TextInput/TextInput';
import Label from 'HTML_components/Label/Label';
import FormWrapper from '../../components/Utillity components/FormWrapper/FormWrapper';
import ViewWrapper from '../../components/Utillity components/ViewWrapper/ViewWrapper';
import useFormControl, { validate } from '../../customHooks/useFormControl';
import controlMethods from '../../utils/componentUtils/formControl/controlMethods';

function Register() {
    const formControl = useFormControl(
        validate('email', controlMethods.email),
        validate('password', ({ value }) => {
            if (!value) return 'Password is required';
            if (value.length < 3) return 'Must be at least 3 characters';
            if (formControl.get('new-password')?.value !== '')
                formControl.update('new-password');
        }),
        validate('new-password', ({ value }) => {
            if (!value) return 'Password is required';
            if (value.length < 3) return 'Must be at least 3 characters';
            if (formControl.get('password')?.value !== value)
                return 'Passwords do not match';
        })
    );

    return (
        <ViewWrapper className="register">
            <Label type={'h1'}>Register</Label>
            <FormWrapper
                onSubmit={() => {
                    console.log('SUBMITED');
                }}
                formControl={formControl}
            >
                <Div className="registerInputSection">
                    <Label>Email: </Label>
                    <TextInput
                        control={formControl.set('email')}
                        autoComplete={'new-email'}
                        type={'email'}
                        name="email"
                        required
                    ></TextInput>
                </Div>

                <Div className="registerInputSection">
                    <Label>Password: </Label>
                    <TextInput
                        control={formControl.set('password')}
                        autoComplete={'new-password'}
                        minLength={3}
                        type={'password'}
                        name="password"
                        required
                    ></TextInput>
                </Div>

                <Div className="registerInputSection">
                    <Label>Confirm Password: </Label>
                    <TextInput
                        control={formControl.set('new-password')}
                        autoComplete={'new-password'}
                        minLength={3}
                        type={'password'}
                        name="new-password"
                        required
                    ></TextInput>
                </Div>

                <Button type={'submit'}>Register</Button>
            </FormWrapper>
            <Label type={'p'} className="tooltip">
                Have an account? <a href="/login">Login</a>
            </Label>
        </ViewWrapper>
    );
}

export default Register;
