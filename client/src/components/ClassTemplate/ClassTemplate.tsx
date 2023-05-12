import { useEffect, useState } from 'react';
import { getStudentsByClass } from '../../data/getStudents';
import Button from 'HTML_components/Button/Button';
import Div from 'HTML_components/Div/Div';
import Label from 'HTML_components/Label/Label';
import { SuperModalController } from '../Modal Components/SuperModal/SuperModal';
import { Student } from '../../data/Interfaces/Student';
import { Class } from '../../data/Interfaces/Class';
import xIcon from '../../svg/closeIcon.svg';

export interface ClassTemplateProps extends Class {
    idx?: number;
    anchor?: string | null;
}

function ClassTemplate(props: ClassTemplateProps) {
    const [students, setStudents] = useState<Student[] | null>(null);

    useEffect(() => {
        async function getStudents() {
            if (!props.class_id) return;
            await getStudentsByClass(props.class_id)
                .then((item) => {
                    if (!item) return;
                    setStudents(item);
                })
                .catch(console.error);
        }
        getStudents();
    }, [props.class_id]);

    function ClassModal() {
        return (
            <Div className={'classModal'}>
                <Div className={'topPart'}>
                    <Div className={'classAndTeach'}>
                        <Label className={'modalClass'}>{props.name}</Label>
                        <Label className={'modalTeach'}>
                            Taught by {props.teacher}
                        </Label>
                    </Div>
                    <Label
                        onClick={() => {
                            SuperModalController.Hide('all');
                        }}
                        className={'close'}
                    >
                        <img src={xIcon}></img>
                    </Label>
                </Div>
                <Div className={'middlePart'}>
                    <Label>{props.description}</Label>
                </Div>
                <Div className={'bottomPart'}>
                    <Label>
                        Class time: {props.start_time?.split(":").splice(0, 2).join(":")} - {props.end_time?.split(":").splice(0, 2).join(":")}
                    </Label>
                    <Label>Credits: {props.credits}</Label>
                    <Label>
                        (Students: {students === null ? '' : students.length} / {props.max_students})
                    </Label>
                    <Label>Semester: {props.semester}</Label>
                    <Label>Subject: {props.subject}</Label>
                </Div>
                <Div className={'modalButton'}>
                    <Button look={'standardBlue'}>Register</Button>
                </Div>
            </Div>
        );
    }

    function HoldComponent() {
        return (
            <Div
                className={props.name.split(' ').join('-') + ' normal'}
                onClick={() => {
                    console.log('put modal in here');
                }}
            >
                <Div className="topPart">
                    <Label type={'h1'}>{props.name}</Label>
                    <Label type={'p'}>{props.teacher}</Label>
                </Div>
                <Div className="middlePart">
                    <Label type={'h2'}>{props.description}</Label>
                </Div>
                <Div className="bottomPart">
                    <Label type={'p'} className="credits">
                        credits: {props.credits}
                    </Label>
                    <Label type={'p'} className="student-amount">
                        students: {students === null ? '' : students.length}/
                        {props.max_students}
                    </Label>
                    <Label type={'p'} className="Semester">
                        Semester: {props.semester}
                    </Label>
                </Div>
            </Div>
        );
    }

    if (props.anchor) {
        return (
            <a
                href={`class-list${props.anchor}?index=${props.idx}&class_id=${props.class_id}`}
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
            <Div
                className={'subClasses'}
                onClick={() => {
                    SuperModalController.Display(<ClassModal />);
                }}
            >
                <HoldComponent />
            </Div>
        );
    }
}

export default ClassTemplate;
