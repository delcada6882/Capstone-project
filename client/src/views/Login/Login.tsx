import './login.scss';
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"
import Label from 'HTML_components/Label/Label';
import Divider from 'HTML_components/Divider/Divider';
import LabelCheckbox from '../../components/Utillity components/LabelCheckbox/LabelCheckbox';
import FormWrapper from '../../components/Utillity components/FormWrapper/FormWrapper';
import Button from 'HTML_components/Button/Button';
import TextInput from 'HTML_components/Inputs/TextInput/TextInput';
import { validateStudent } from '../../data/getStudents';
import ViewWrapper from '../../components/Utillity components/ViewWrapper/ViewWrapper';
import { SuperModalController } from '../../components/Modal Components/SuperModal/SuperModal';
import { useState } from 'react';

function Login() {
    const [errorFlash, setErrorFlash] = useState(false);
    const handleLogin = (children) => {
        async function runAsyncOnValidate() {
            try {
                const isValid = await validateStudent(
                    children[0].value,
                    children[1].value
                );
                if (isValid) {
                    setErrorFlash(false);
                    // ROUTE TO HOMEPAGE
                } else {
                    setErrorFlash(true);
                }
            } catch (error) {
                console.error(error);
                SuperModalController.Toast({ Title: 'Something went wrong' });
            }
        }
        runAsyncOnValidate();
    };

    return (
        <ViewWrapper className="login">
            {/* <Logo /> */}
            <Label type={'h1'}>Login</Label>
            <FormWrapper onSubmit={handleLogin}>
                <Divider className="loginInputSection">
                    <Label>Email: </Label>
                    <TextInput
                        required={true}
                        type={'email'}
                        name="email"
                    ></TextInput>
                </Divider>
                <Divider className="loginInputSection">
                    <Label>Password: </Label>
                    <TextInput
                        minLength={3}
                        required={true}
                        type={'password'}
                        name="password"
                    ></TextInput>
                </Divider>

                <Divider className="loginInputSectionCheck">
                    <LabelCheckbox checkboxId={'staySignedIn'}>
                        Remember me?
                    </LabelCheckbox>
                </Divider>

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
