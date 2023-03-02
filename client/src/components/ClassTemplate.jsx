import Button from "./HTML tag components/Button/Button";
import Divider from "./HTML tag components/Divider/Divider";
import Label from "./HTML tag components/Label/Label";

function ClassTemplate(props) { 

    return(
        <Divider className={'subClasses ' + props.name.split(" ").join("-")}>
            <Divider className="topPart">
                <Label type={'h1'}>{props.name}</Label>
                <Label type={'p'}>{props.teacher}</Label>
            </Divider>
            <Divider className="middlePart">
                <Label type={'h2'}>{props.description}</Label>
            </Divider>
            <Divider className="bottomPart">
                <Label type={'p'} className="credits">credits: {props.credits}</Label>
                <Label type={'p'} className="student-amount">students: {props.students}/{props.maxStudents}</Label>
                <Label type={'p'} className="Semester">Semester: {props.semester}</Label>
            </Divider>
            <Divider className="buttonFilter">
                <Button look={'standardBlue'}>Register</Button>
            </Divider>
        </Divider>
    );
}

export default ClassTemplate