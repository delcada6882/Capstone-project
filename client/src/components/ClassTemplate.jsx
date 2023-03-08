import { useEffect, useState } from 'react';
import { getStudentsByClass } from '../data/getStudents';
import Button from './HTML tag components/Button/Button';
import Divider from './HTML tag components/Divider/Divider';
import Label from './HTML tag components/Label/Label';

function ClassTemplate(props) {

    const [students, setStudents] = useState(null);

    useEffect(() => {
        async function getStudents() {
            await getStudentsByClass(props.class_id).then((item) => {
                setStudents(item)
            })
        }
        getStudents();
    }, [props.class_id])


    if (props.anchor) {
        return (
                <a 
                href={`class${props.anchor}?index=${props.idx}`}
                key={`anchor-for-${props.name}`}
                className={'subClasses ' + props.name.split(' ').join('-') + " " + "administrator"}
                >
                    <Divider className="topPart">
                        <Label type={'h1'}>{props.name}</Label>
                        <Label type={'p'}>{props.teacher}</Label>
                    </Divider>
                    <Divider className="middlePart">
                        <Label type={'h2'}>{props.description}</Label>
                    </Divider>
                    <Divider className="bottomPart">
                        <Label type={'p'} className="credits">
                            credits: {props.credits}
                        </Label>
                        <Label type={'p'} className="student-amount">
                            students: {students === null ? "" : students.length}/{props.maxStudents}
                        </Label>
                        <Label type={'p'} className="Semester">
                            Semester: {props.semester}
                        </Label>
                    </Divider>
                </a>
        );
    } else {
        return(
            <Divider className={'subClasses ' + props.name.split(' ').join('-') + ' normal'} onClick={() => {console.log('put modal in here')}}>
                <Divider className="topPart">
                    <Label type={'h1'}>{props.name}</Label>
                    <Label type={'p'}>{props.teacher}</Label>
                </Divider>
                <Divider className="middlePart">
                    <Label type={'h2'}>{props.description}</Label>
                </Divider>
                <Divider className="bottomPart">
                    <Label type={'p'} className="credits">
                        credits: {props.credits}
                    </Label>
                    <Label type={'p'} className="student-amount">
                        students: {props.students}/{props.maxStudents}
                    </Label>
                    <Label type={'p'} className="Semester">
                        Semester: {props.semester}
                    </Label>
                </Divider>
                <Divider className="buttonFilter">
                    <Button look={'standardBlue'}>Register</Button>
                </Divider>
            </Divider>
        );
    }
}

export default ClassTemplate;
