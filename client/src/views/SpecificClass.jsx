import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from '../components/HTML tag components/Button/Button.jsx';
import Divider from '../components/HTML tag components/Divider/Divider.jsx';
import Label from '../components/HTML tag components/Label/Label.jsx';
import { getAllClasses, getSomeClasses } from '../data/getClasses.js';
import { getStudentsByClass } from '../data/getStudents.js';
import ArrowDown from '../svg/ArrowDown.jsx';
import '../views/specificClass.scss';

function SpecificClass() {
    const studentBoxRef = useRef();
    const { specificClass } = useParams();
    const [searchParams] = useSearchParams();
    const index = searchParams.get('index');
    const [students, setStudents] = useState();
    const [data, setData] = useState(null);

    useEffect(() => {
        console.log(index);
        async function redoClasses() {
            await getSomeClasses(index, 1).then((item) => {
                setData(item);
                console.log(item);
            });
        }
        redoClasses();
    }, []);

    useEffect(() => {
        console.log(data);

        async function getStudents() {
            await getStudentsByClass(data[0]['class_id']).then((item) => {
                setStudents(item);
            });
        }
        if (data != null) {
            getStudents();
        }
    }, [data]);

    useEffect(() => {
        console.log(students);
    }, [students]);

    function studentsMap() {
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
        // <div>
        //     <p>{JSON.stringify(data)}</p>
        //     <p>{JSON.stringify(students)}</p>
        //     <p>{!students ? null : students.length}</p>
        // </div>
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
            <Divider className={'studentsBox'} innerRef={studentBoxRef}>
                <Divider
                    className={'headOfStudents'}
                    onClick={(e) => {
                        studentBoxRef.current.classList.toggle('studentsClick');
                    }}
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
