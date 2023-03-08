import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from '../components/HTML tag components/Button/Button.jsx';
import Divider from '../components/HTML tag components/Divider/Divider.jsx';
import Label from '../components/HTML tag components/Label/Label.jsx';
import { getAllClasses, getSomeClasses } from '../data/getClasses.js';
import { getStudentsByClass } from '../data/getStudents.js';
import ArrowDown from '../svg/ArrowDown.jsx';
import '../views/specificClass.scss';

function SpecificClass() {
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
        if(students !== null && students !== undefined) {
            returnVal = students.map((elem, idx) => {
                return (
                    <Divider className={'students'}>
                        <p key={idx}>
                            {elem.first_name +
                                ' ' +
                                elem.last_name}
                        </p>
                        <Button look={'standardRed'}>Remove</Button>
                    </Divider>
                );
            });
        }
        return returnVal
    }

    return (
        // <div>
        //     <p>{JSON.stringify(data)}</p>
        //     <p>{JSON.stringify(students)}</p>
        //     <p>{!students ? null : students.length}</p>
        // </div>
        <Divider className={'specificClass'}>
            <Divider className={'nameAndTeach'}>
                <Label type={'h1'} contentEditable={true}>{data === null ? '' : data[0].name}</Label>
                <Label type={'p'}>{data === null ? '' : data[0].teacher}</Label>
            </Divider>
            <Divider className={'description'}>
                <Label type={'h2'}>
                    {data === null ? '' : data[0].description}
                </Label>
            </Divider>
            <Divider
                className={'studentsBox'}
                onClick={(e) => {
                    e.currentTarget.classList.toggle('studentsClick');
                }}
            >
                <Divider className={'headOfStudents'}>
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
