import './login.scss';
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"
import Label from '../components/HTML tag components/Label/Label';
import Divider from '../components/HTML tag components/Divider/Divider';
import LabelCheckbox from '../components/Utillity components/LabelCheckbox/LabelCheckbox';
import FormWrapper from '../components/Utillity components/FormWrapper/FormWrapper';
import Button from '../components/HTML tag components/Button/Button';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput';

function Login() {
    return (
        <Divider className="login">
            {/* <Logo /> */}
            <Label type={'h1'}>Login</Label>
            <FormWrapper onSubmit={null}>
                <Divider className="inputSection">
                    <Label>Email: </Label>
                    <TextInput
                        requireMessage={'Please enter a valid email'}
                        required={true}
                        type={'email'}
                        name="email"
                    ></TextInput>
                </Divider>
                <Divider className="inputSection">
                    <Label>Password: </Label>
                    <TextInput
                        required={true}
                        type={'password'}
                        name="password"
                    ></TextInput>
                </Divider>

                <Divider className="inputSectionCheck">
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
