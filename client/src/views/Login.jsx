import './login.scss';
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"
import Label from '../components/HTML tag components/Label/Label';
import Divider from '../components/HTML tag components/Divider/Divider';
import LabelCheckbox from '../components/Utillity components/LabelCheckbox/LabelCheckbox';
import FormWrapper from '../components/Utillity components/FormWrapper/FormWrapper';
import Button from '../components/HTML tag components/Button/Button';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput';
import { validateStudent } from '../data/getStudents';
import { useEffect, useState } from 'react';

function Login(props) {
    // const [auth, setAuth] = useState('heha');
    const [user, setUser] = useState();

    const handleLogin = (children) => {
        try {
            validateStudent(children[0].value, children[1].value).then((item) => {
                // console.log(item)
                {item === undefined ? props.userSetTest(null) : props.userSetTest(children[0].value)}
                {item === undefined ? props.authSetTest(false) : props.authSetTest(true)}
                window.location = '/class'
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Divider className="login">
            {/* <Logo /> */}
            <Label type={'h1'}>Login</Label>
            <FormWrapper onSubmit={handleLogin}>
                <Divider className="loginInputSection">
                    <Label>Email: </Label>
                    <TextInput
                        requireMessage={'Please enter a valid email'}
                        required={true}
                        type={'email'}
                        name="email"
                    ></TextInput>
                </Divider>
                <Divider className="loginInputSection">
                    <Label>Password: </Label>
                    <TextInput
                        minLength="3"
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
            <Label className={'tooltip'}>
                Don't have an account? <a href="/register">Make one</a>
            </Label>
        </Divider>
    );
}

export default Login;
