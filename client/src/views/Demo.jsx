import './Demo.scss';
// import { ReactComponentElement as Logo } from "../svg/PLACEHOLDERLOGO.svg"
import Label from '../components/HTML tag components/Label/Label';
import Divider from '../components/HTML tag components/Divider/Divider';
import LabelCheckbox from '../components/Utillity components/LabelCheckbox/LabelCheckbox';
import FormWrapper from '../components/Utillity components/FormWrapper/FormWrapper';
import Button from '../components/HTML tag components/Button/Button';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput';
import ViewWrapper from '../components/Utillity components/ViewWrapper/ViewWrapper';
import { SuperModalController } from '../components/Modal Components/SuperModal/SuperModal';

function Demo(props) {
    return (
        <ViewWrapper className="Demo">
            {/* <Logo /> */}
            <Label type={'h1'}>Demo Form</Label>
            <FormWrapper onSubmit={() => {
                SuperModalController.Toast(<h3>Form Submitted</h3>)
                console.log('submitted')
                }}>
                <Divider className="DemoInputSection">
                    <Label>Email: </Label>
                    <TextInput
                        requireMessage={'Please enter a valid email'}
                        required={true}
                        type={'email'}
                        name="email"
                    ></TextInput>
                </Divider>
                <Divider className="DemoInputSection">
                    <Label>required i.e. </Label>
                    <TextInput
                        requireMessage={'Please fill out this field'}
                        required={true}
                        type={'text'}
                        name="etc"
                    ></TextInput>
                </Divider>
                <Divider className="DemoInputSection">
                    <Label>not required </Label>
                    <TextInput
                        requireMessage={'custom require message'}
                        required={false}
                        type={'text'}
                        name="text"
                    ></TextInput>
                </Divider>{' '}
                <Divider className="DemoInputSection">
                    <Label>Confirm Password: </Label>
                    <TextInput
                        minLength="3"
                        required={true}
                        type={'password'}
                        name="password"
                    ></TextInput>
                </Divider>
                <Divider className="DemoInputSection">
                    <Label>Password: </Label>
                    <TextInput
                        minLength="3"
                        required={true}
                        type={'password'}
                        name="password2"
                    ></TextInput>
                </Divider>
                <Divider className="DemoInputSectionCheck">
                    <LabelCheckbox checkboxId={'staySignedIn'}>
                        Remember me?
                    </LabelCheckbox>
                </Divider>
                <Button type={'submit'} look={'standardBlue'}>
                    Demo
                </Button>
            </FormWrapper>
            <Label className={'tooltip'}>
                Don't have an account? <a href="/register">Make one</a>
            </Label>
        </ViewWrapper>
    );
}

export default Demo;
