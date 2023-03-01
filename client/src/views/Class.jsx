import { useEffect, useMemo, useState } from 'react';
import ClassTemplate from '../components/ClassTemplate.jsx';
import Divider from '../components/HTML tag components/Divider/Divider.jsx';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput.jsx';
import Label from '../components/HTML tag components/Label/Label.jsx';
import SearchSVG from '../svg/SearchSVG.jsx';
import ArrowDown from '../svg/ArrowDown.jsx'
import {getAllClasses} from '/Users/adamdelcastillo-call/Documents/mtechaug22 HOMEWORK/Mtech 2/capstone-project/Capstone-project/client/src/data/getStudents.js';
import '../views/class.scss';

function Class() {
    const [data, setData] = useState(null);
    const [classes, setClasses] = useState(null);
    const [classHTML, setClassHTML] = useState(null);

    const [searchData, setSearchData] = useState(null);

    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();

    const notClass = {
        1: {
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
        2: {
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
        3: {
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
        4: {
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
        5: {
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
        6: {
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
    };

    useEffect(() => {
        async function redoClasses() {
            await getAllClasses().then((item) => {console.log('setting classes');setClasses(item)})
        }
        const searchRegex = new RegExp(searchData, 'gmi');
        console.log(searchData);

        // setClassHTML(null);

        let dataArr = [];

        if(classes !== null) {
            for (let x = 0; x < Object.keys(classes).length; x++) {
                if (classes[x].name.match(searchRegex)) {
                    console.log(classes[x].name);
                    // dataArr.push(classes[x].name)
                    dataArr.push(
                        <a
                            href="/"
                            style={{ width: '100%', textDecoration: 'none' }}
                            key={`anchor-for-${classes[x].name}${x}`}
                        >
                            <ClassTemplate
                                key={classes[x].name + x}
                                name={classes[x].name}
                                teacher={classes[x].teacher}
                                description={classes[x].description}
                                credits={classes[x].credits}
                                students={classes[x].current_am_students}
                                maxStudents={classes[x].max_students}
                                semester={classes[x].semester}
                            />
                        </a>
                    );
                }
            }
        }
        else {
            redoClasses();
        }
        setClassHTML(dataArr);
        console.log(dataArr);
        if (dataArr.length === 0) {
            setClassHTML(
                <p>There are no classes that match your search &gt;:&#40;</p>
            );
        }
    }, [searchData]);

    useEffect(() => {
        if(!classes) return;
        let dataArr = [];
        for (let x = 0; x < Object.keys(classes).length; x++) {
            console.log(classes[x].name);
            // dataArr.push(classes[x].name)
            dataArr.push(
                <a
                    href="/"
                    style={{ width: '100%', textDecoration: 'none' }}
                    key={`anchor-for-${classes[x].name}${x}`}
                >
                    <ClassTemplate
                        key={classes[x].name + x}
                        name={classes[x].name}
                        teacher={classes[x].teacher}
                        description={classes[x].description}
                        credits={classes[x].credits}
                        students={classes[x].current_am_students}
                        maxStudents={classes[x].max_students}
                        semester={classes[x].semester}
                    />
                </a>
            );
        }
        setClassHTML(dataArr)
    },[classes])

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
                <Divider className={'advancedSearch'} look={'standardBlue'} onClick={(e) => {e.currentTarget.classList.toggle('click')}}>
                    <Label type='p'>Advanced Search</Label>
                    <ArrowDown />
                </Divider>
            </Divider>
            <Divider className="classes">{classHTML}</Divider>
        </Divider>
    );
}

export default Class;
