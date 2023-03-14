import Button from '../components/HTML tag components/Button/Button';
import Divider from '../components/HTML tag components/Divider/Divider';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput';
import Label from '../components/HTML tag components/Label/Label';
import FormWrapper from '../components/Utillity components/FormWrapper/FormWrapper';
import ViewWrapper from '../components/Utillity components/ViewWrapper/ViewWrapper';
import './register.scss';
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"

function Register() {
    return (
        <ViewWrapper className="register">
            {/* <Logo /> */}
            <Label type={'h1'}>Register</Label>
            <FormWrapper>
                <Divider className="registerInputSection">
                    <Label>Email: </Label>
                    <TextInput required type={'email'} name="email"></TextInput>
                </Divider>
                <Divider className="registerInputSection">
                    <Label>Password: </Label>
                    <TextInput
                        minLength="3"
                        required
                        type={'password'}
                        name="password"
                    ></TextInput>
                </Divider>

                <Divider className="registerInputSection">
                    <Label>Confirm Password: </Label>
                    <TextInput
                        minLength="3"
                        required={true}
                        type={'password'}
                        name="password"
                    ></TextInput>
                </Divider>

                <Button>Register</Button>
            </FormWrapper>
            <Label type={'p'} className="tooltip">
                Have an account? <a href="/login">Login</a>
            </Label>
        </ViewWrapper>
    );
}

export default Register;
