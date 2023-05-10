import './login.scss';
import Label from 'HTML_components/Label/Label';
import Div from 'HTML_components/Div/Div';
import LabelCheckbox from '../../components/Utillity components/LabelCheckbox/LabelCheckbox';
import FormWrapper, {
    FormkeyElement,
} from '../../components/Utillity components/FormWrapper/FormWrapper';
import Button from 'HTML_components/Button/Button';
import TextInput from 'HTML_components/Inputs/TextInput/TextInput';
import { validateStudent } from '../../data/getStudents';
import ViewWrapper from '../../components/Utillity components/ViewWrapper/ViewWrapper';
import { SuperModalController } from '../../components/Modal Components/SuperModal/SuperModal';
import { useState } from 'react';
import useFormControl, { validate } from '../../customHooks/useFormControl';
import controlMethods from '../../utils/componentUtils/formControl/controlMethods';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [errorFlash, setErrorFlash] = useState(false);
    const navigate = useNavigate();
    const formControl = useFormControl(
        validate('email', controlMethods.email),
        validate('password', controlMethods.minLength(3))
    );

    const handleLogin = (children: FormkeyElement[]) => {
        async function runAsyncOnValidate() {
            if (children.length < 2) return;
            try {
                const isValid = await validateStudent(
                    children[0].value,
                    children[1].value
                );
                if (isValid) {
                    setErrorFlash(false);
                    navigate('/');
                } else {
                    SuperModalController.Toast('Invaild Email or Password', {
                        type: 'warning',
                    });
                    setErrorFlash(true);
                }
            } catch (error) {
                console.error(error);
                SuperModalController.Toast('Something went wrong', {
                    type: 'error',
                });
            }
        }
        runAsyncOnValidate();
    };

    return (
        <ViewWrapper className="login">
            <Label type={'h1'}>Login</Label>
            <FormWrapper onSubmit={handleLogin} formControl={formControl}>
                <Div className="loginInputSection">
                    <Label>Email: </Label>
                    <TextInput
                        required={true}
                        type={'email'}
                        name="email"
                        autoComplete="email"
                        control={formControl.set('email')}
                    ></TextInput>
                </Div>
                <Div className="loginInputSection">
                    <Label>Password: </Label>
                    <TextInput
                        minLength={3}
                        required={true}
                        type={'password'}
                        name="password"
                        autoComplete="current-password"
                        control={formControl.set('password')}
                    ></TextInput>
                </Div>

                <Div className="loginInputSectionCheck">
                    <LabelCheckbox
                        label="Remember me?"
                        id={'staySignedIn'}
                        name={'staySignedIn'}
                    />
                </Div>

                <Button type={'submit'} look={'standardBlue'}>
                    Login
                </Button>
            </FormWrapper>
            {errorFlash ? (
                <Label style={{ color: '#f32525' }}>
                    ✷Invaild Email or Password
                </Label>
            ) : null}
            <Label className={'tooltip'}>
                Don't have an account? <a href="/register">Make one</a>
            </Label>
        </ViewWrapper>
    );
}

export default Login;
