import { useEffect, useState } from 'react';
import { getStudentsByClass } from '../data/getStudents';
import Button from './HTML tag components/Button/Button';
import Divider from './HTML tag components/Divider/Divider';
import Label from './HTML tag components/Label/Label';
import { SuperModalController } from '../components/Modal Components/SuperModal/SuperModal';

function ClassTemplate(props) {
    const [students, setStudents] = useState(null);
    const [overlayOn, setOverlayOn] = useState(true);

    function ClassModal() {
        return (
            <Divider className={'classModal'}>
                <Divider className={'topPart'}>
                    <Divider className={'classAndTeach'}>
                        <Label className={'modalClass'}>{props.name}</Label>
                        <Label className={'modalTeach'}>
                            Taught by {props.teacher}
                        </Label>
                    </Divider>
                    <Label
                        onClick={() => {
                            SuperModalController.Hide('all');
                        }}
                        className={'close'}
                    >
                        X
                    </Label>
                </Divider>
                <Divider>
                    <Label>{props.description}</Label>
                </Divider>
                <Divider className={'bottomPart'}>
                    <Label>
                        Class time: {props.startTime} - {props.endTime}
                    </Label>
                    <Label>Credits: {props.credits}</Label>
                    <Label>
                        Students: {students.length} / {props.maxStudents}
                    </Label>
                    <Label>Semester: {props.semester}</Label>
                    <Label>Subject: {props.subject}</Label>
                </Divider>
                <Divider className={'modalButton'}>
                    <Button look={'standardBlue'}>Register</Button>
                </Divider>
            </Divider>
        );
    }

    useEffect(() => {
        async function getStudents() {
            await getStudentsByClass(props.class_id).then((item) => {
                setStudents(item);
            });
        }
        getStudents();
    }, [props.class_id]);

    function HoldComponent() {
        return (
            <Divider
                className={props.name.split(' ').join('-') + ' normal'}
                onClick={() => {
                    console.log('put modal in here');
                }}
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
                        students: {students === null ? '' : students.length}/
                        {props.maxStudents}
                    </Label>
                    <Label type={'p'} className="Semester">
                        Semester: {props.semester}
                    </Label>
                </Divider>
            </Divider>
        );
    }

    if (props.anchor) {
        return (
            <a
                href={`class${props.anchor}?index=${props.idx}`}
                key={`anchor-for-${props.name}`}
                className={
                    'subClasses ' +
                    props.name.split(' ').join('-') +
                    ' ' +
                    'administrator'
                }
            >
                <HoldComponent />
            </a>
        );
    } else {
        return (
            <Divider
                className={'subClasses'}
                onClick={() => {
                    SuperModalController.Display(<ClassModal />);
                }}
            >
                <HoldComponent />
            </Divider>
        );
    }
}

export default ClassTemplate;
