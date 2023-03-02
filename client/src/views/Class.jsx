import { useEffect, useMemo, useState } from 'react';
import ClassTemplate from '../components/ClassTemplate.jsx';
import Divider from '../components/HTML tag components/Divider/Divider.jsx';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput.jsx';
import Label from '../components/HTML tag components/Label/Label.jsx';
import SearchSVG from '../svg/SearchSVG.jsx';
import ArrowDown from '../svg/ArrowDown.jsx';
import { getAllClasses } from '../data/getStudents.js';
import '../views/class.scss';

function Class() {
    const [data, setData] = useState(null);
    const [classes, setClasses] = useState([]);
    const [classHTML, setClassHTML] = useState(null);

    const [searchData, setSearchData] = useState('');

    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();

    const notClass = [
        {
            name: 'Computer Science',
            subject: 'Science',
            teacher: 'Cole Nelson',
            description:
                "It's a class about computer science, what else do you want from me?",
            credits: 4,
            semester: `Winter ${yearNow}`,
            start_time: 1000,
            end_time: 1200,
            max_students: 20,
            current_am_students: 5,
        },
        {
            name: 'Advanced Research',
            subject: 'Writing',
            teacher: 'Susan Lastnamington',
            description:
                "It's a class about advanced research, what else do you want from me?",
            credits: 2,
            semester: `Spring ${yearNow}`,
            start_time: 1200,
            end_time: 1300,
            max_students: 22,
            current_am_students: 10,
        },
        {
            name: 'Not a class',
            subject: 'Nothing',
            teacher: 'Nobody',
            description: "It's a class about nothing, this ISN'T A CLASS",
            credits: 0,
            semester: `never ${yearNow}`,
            start_time: 0,
            end_time: 0,
            max_students: 0,
            current_am_students: 0,
        },
        {
            name: 'Not a class',
            subject: 'Nothing',
            teacher: 'Nobody',
            description: "It's a class about nothing, this ISN'T A CLASS",
            credits: 0,
            semester: `never ${yearNow}`,
            start_time: 0,
            end_time: 0,
            max_students: 0,
            current_am_students: 0,
        },
        {
            name: 'Not a class',
            subject: 'Nothing',
            teacher: 'Nobody',
            description: "It's a class about nothing, this ISN'T A CLASS",
            credits: 0,
            semester: `never ${yearNow}`,
            start_time: 0,
            end_time: 0,
            max_students: 0,
            current_am_students: 0,
        },
        {
            name: 'Not a class',
            subject: 'Nothing',
            teacher: 'Nobody',
            description: "It's a class about nothing, this ISN'T A CLASS",
            credits: 0,
            semester: `never ${yearNow}`,
            start_time: 0,
            end_time: 0,
            max_students: 0,
            current_am_students: 0,
        },
    ];
    useEffect(() => {
        async function redoClasses() {
            await getAllClasses().then((item) => {
                setClasses([...notClass, ...item]);
            });
        }
        redoClasses();
    }, []);

    useEffect(() => {
        const searchRegex = new RegExp(searchData, 'gmi');

        let dataArr = [];
        if (classes !== null) {
            dataArr = classes.map((elem, idx) => {
                if (elem.name.match(searchRegex)) {
                    return (
                        <a
                            href="/"
                            style={{ width: '100%', textDecoration: 'none' }}
                            key={`anchor-for-${elem.name}${idx}`}
                        >
                            <ClassTemplate
                                key={elem.name + idx}
                                name={elem.name}
                                teacher={elem.teacher}
                                description={elem.description}
                                credits={elem.credits}
                                students={elem.current_am_students}
                                maxStudents={elem.max_students}
                                semester={elem.semester}
                            />
                        </a>
                    );
                }
                return null;
            });
        }
        setClassHTML(dataArr);
        if (dataArr.length === 0) {
            setClassHTML(
                <p>There are no classes that match your search &gt;:&#40;</p>
            );
        }
    }, [classes, searchData]);

    return (
        <Divider className="class">
            <Divider className="searchArea">
                <Divider className="searchBar">
                    <SearchSVG className={'searchSVG'} />
                    <TextInput
                        type={'text'}
                        placeholder="Search classes here"
                        onChange={(e) => {
                            setSearchData(e.currentTarget.value);
                        }}
                    />
                </Divider>
                <Divider
                    className={'advancedSearch'}
                    look={'standardBlue'}
                    onClick={(e) => {
                        e.currentTarget.classList.toggle('click');
                    }}
                >
                    <Label type="p">Advanced Search</Label>
                    <ArrowDown />
                </Divider>
            </Divider>
            <Divider className="classes">{classHTML}</Divider>
        </Divider>
    );
}

export default Class;
