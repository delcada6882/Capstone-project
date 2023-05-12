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
import React, { useState, useRef, useEffect, useContext } from 'react';
import useFormControl, { validate } from '../../customHooks/useFormControl';
import controlMethods from '../../utils/componentUtils/formControl/controlMethods';
import { redirect, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
const LOGIN_URL = '/auth'

// import axios from '../.../api/axios.js';

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef: any = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [errorFlash, setErrorFlash] = useState(false);
    const navigate = useNavigate();
    const formControl = useFormControl(
        validate('email', controlMethods.email),
        validate('password', controlMethods.minLength(3))
    );

    // useEffect(() => {
    //     userRef.current.focus()
    // }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        try {
            //User has the be the same name as the property in the body of the request
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken })
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Something went wrong');
            }
            else if (err?.response.status === 400) {
                setErrMsg('Missing Username or Password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
        }
        // redirect('/') This is what I think will work best. But Imma just follow the tutorial for now.
    }

    const handleLogin = (children: FormkeyElement[]) => {
        async function runAsyncOnValidate() {
            if (children.length < 2) return;
            try {
                const isValid = await validateStudent(
                    children[0].value,
                    children[1].value
                );
                if (isValid) {
                    console.log('valid')
                    setErrorFlash(false);
                    navigate('/');
                } else {
                    console.log('invalid')
                    SuperModalController.Toast('Invalid Email or Password', {
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
        // setSuccess(true);
    };

    return (
        <>
            {success ? (<p>You are logged in</p>) :
                (<ViewWrapper className="login">
                    <Label type={'h1'}>Login</Label>
                    <FormWrapper onSubmit={(formElems: FormkeyElement[], e: Event) => { console.log('haha'); handleSubmit(e) }} formControl={formControl}>
                        <Div className="loginInputSection">
                            <Label htmlFor='email'>Email: </Label>
                            <TextInput
                                required={true}
                                type={'email'}
                                name="email"
                                autoComplete="email"
                                control={formControl.set('email')}
                                // ref={userRef}
                                onChange={(e) => { setUser(e.target.value) }}
                                value={user}
                            ></TextInput>
                        </Div>
                        <Div className="loginInputSection">
                            <Label htmlFor='password'>Password: </Label>
                            <TextInput
                                // ref={userRef}
                                minLength={3}
                                required={true}
                                type={'password'}
                                name="password"
                                onChange={(e) => { setPwd(e.target.value) }}
                                value={pwd}
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
                </ViewWrapper>)
            }
        </>);

}

export default Login;
