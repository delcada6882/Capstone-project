import './specificClass.scss';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'HTML_components/Button/Button.jsx';
import Div from 'HTML_components/Div/Div.js';
import Label from 'HTML_components/Label/Label.jsx';
import { getSomeClasses } from '../../data/getClasses.js';
import { getStudentsByClass } from '../../data/getStudents.js';
import ArrowDown from '../../svg/ArrowDown.jsx';
import { Student } from '../../data/Interfaces/Student';
import { Class } from '../../data/Interfaces/Class';

function SpecificClass() {
    const studentBoxRef = useRef<HTMLDivElement | null>(null);
    const [searchParams] = useSearchParams();
    const index = searchParams.get('index');
    const [students, setStudents] = useState<Student[] | null>(null);
    const [data, setData] = useState<Class[] | null>(null);

    useEffect(() => {
        async function redoClasses() {
            if (!index) return;
            await getSomeClasses(+index, 1)
                .then((item) => {
                    setData(item);
                })
                .catch(console.error);
        }
        redoClasses();
    }, [index]);

    useEffect(() => {
        async function getStudents() {
            if (!data || !data[0].class_id) return;
            await getStudentsByClass(data[0]?.class_id).then((item) => {
                if (!item) return;
                setStudents(item);
            });
        }
        if (data != null) {
            getStudents();
        }
    }, [data]);

    function studentsMap() {
        let returnVal;
        if (students !== null && students !== undefined) {
            returnVal = students.map((elem, idx) => {
                return (
                    <Div className={'students'}>
                        <a
                            key={idx}
                            href={`/users/${elem.first_name}${elem.last_name}`}
                        >
                            {elem.first_name + ' ' + elem.last_name}
                        </a>
                        <Button look={'standardRed'}>Remove</Button>
                    </Div>
                );
            });
        }
        return returnVal;
    }

    return (
        <Div className={'specificClass'}>
            <Div className={'nameAndTeach'}>
                <Div className={'name'}>
                    <Label type={'h1'}>
                        {data === null ? '' : data[0].name}
                    </Label>
                    <Label type={'p'}>
                        {data === null ? '' : `Taught by ${data[0].teacher}`}
                    </Label>
                </Div>
                <Div className={'editDataButton'}>
                    <Button look={'standardRed'}>
                        <a
                            href={
                                data === null
                                    ? '/error'
                                    : `/class/edit/${data[0].name}?index=${index}`
                            }
                        >
                            Edit Class Data
                        </a>
                    </Button>
                </Div>
            </Div>
            <Div className={'description'}>
                <Label type={'h2'}>
                    {data === null ? '' : data[0].description}
                </Label>
            </Div>
            <Div className={'basicData'}>
                <Label className={'subject'}>
                    Subject: {data === null ? '' : data[0].subject}
                </Label>
                <Label className={'subject'}>
                    Time:{' '}
                    {data === null
                        ? ''
                        : `${data[0].start_time} - ${data[0].end_time}`}
                </Label>
                <Label className={'credits'}>
                    Credits: {data === null ? '' : `${data[0].credits}`}
                </Label>
                <Label className={'semester'}>
                    Semester: {data === null ? '' : `${data[0].semester}`}
                </Label>
            </Div>
            <Div className={'studentsBox'} ref={studentBoxRef}>
                <Div
                    className={'headOfStudents'}
                    onClick={() => {
                        if (!studentBoxRef.current) return;
                        studentBoxRef.current.classList.toggle('studentsClick');
                    }}
                >
                    <Label type={'p'}>Students</Label>
                    <ArrowDown />
                </Div>
                <Div className={'studentsData'}>
                    <hr />
                    {studentsMap()}
                </Div>
            </Div>
        </Div>
    );
}

export default SpecificClass;
