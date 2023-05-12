import './specificClass.scss';
import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from 'HTML_components/Button/Button.jsx';
import Divider from 'HTML_components/Divider/Divider.jsx';
import Label from 'HTML_components/Label/Label.jsx';
import { getClassById } from '../../data/getClasses.js';
import { getStudentsByClass } from '../../data/getStudents.js';
import ArrowDown from '../../svg/ArrowDown.jsx';
import { Student } from '../../data/Interfaces/Student';
import { Class } from '../../data/Interfaces/Class';

function SpecificClass() {
    const studentBoxRef = useRef<HTMLDivElement | null>(null);
    const { specificClass } = useParams();
    const [searchParams] = useSearchParams();
    const index = searchParams.get('index');
    const classId = searchParams.get('class_id');
    const [students, setStudents] = useState<Student[] | null>(null);
    const [data, setData] = useState<Class[] | null>(null);



    useEffect(() => {
        async function getClass() {
            if (!classId) return;
            await getClassById(classId).then((item: Class[]) => {
                    // if (!item) return;
                    console.log(item)
                    setData(item);
                })
                .catch(console.error);
        }
        getClass();
    }, [classId]);

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
        console.log(data)
        let returnVal;
        if (students !== null && students !== undefined) {
            returnVal = students.map((elem, idx) => {
                return (
                    <Divider className={'students'}>
                        <a
                            key={idx}
                            href={`/users/${elem.first_name}${elem.last_name}`}
                        >
                            {elem.first_name + ' ' + elem.last_name}
                        </a>
                        <Button look={'standardRed'}>Remove</Button>
                    </Divider>
                );
            });
        }
        return returnVal;
    }

    return (
        <Divider className={'specificClass'}>
            <Divider className={'nameAndTeach'}>
                <Divider className={'name'}>
                    <Label type={'h1'}>
                        {data === null ? '' : data[0].name}
                    </Label>
                    <Label type={'p'}>
                        {data === null ? '' : `Taught by ${data[0].teacher}`}
                    </Label>
                </Divider>
                <Divider className={'editDataButton'}>
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
                </Divider>
            </Divider>
            <Divider className={'description'}>
                <Label type={'h2'}>
                    {data === null ? '' : data[0].description}
                </Label>
            </Divider>
            <Divider className={'basicData'}>
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
            </Divider>
            <Divider className={'studentsBox'} ref={studentBoxRef} 
                                onClick={() => {
                                    console.log('uh')
                                    console.log(studentBoxRef)
                                    if (!studentBoxRef.current) return;
                                    console.log('HEY')
                                    studentBoxRef.current.classList.toggle('studentsClick');
                                }}
            >
                <Divider
                    className={'headOfStudents'}

                >
                    <Label type={'p'}>Students</Label>
                    <ArrowDown />
                </Divider>
                <Divider className={'studentsData'}>
                    <hr />
                    {studentsMap()}
                </Divider>
            </Divider>
        </Divider>
    );
}

export default SpecificClass;
