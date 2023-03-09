import { useEffect, useState, useRef } from 'react';
import ClassTemplate from '../components/ClassTemplate.jsx';
import Divider from '../components/HTML tag components/Divider/Divider.jsx';
import TextInput from '../components/HTML tag components/Inputs/TextInput/TextInput.jsx';
import Label from '../components/HTML tag components/Label/Label.jsx';
import SearchSVG from '../svg/SearchSVG.jsx';
import ArrowDown from '../svg/ArrowDown.jsx';
import { getAllClasses } from '../data/getClasses.js';
import '../views/class.scss';
import Button from '../components/HTML tag components/Button/Button.jsx';
import NumberInput from '../components/HTML tag components/Inputs/NumberInput/NumberInput.jsx';
import FormWrapper from '../components/Utillity components/FormWrapper/FormWrapper.jsx';
import { getStudentsByClass } from '../data/getStudents.js';

function Class() {
    const [classes, setClasses] = useState([]);
    const [classHTML, setClassHTML] = useState(null);
    const searchBoxRef = useRef();
    const searchButtonRef = useRef();
    const innerSearchBoxRef = useRef();
    const [searchData, setSearchData] = useState('');
    const [isAuth, setIsAuth] = useState(true);
    const [studentData, setStudentData] = useState();

    const subjectRef = useRef();
    const semesterRef = useRef();
    const creditsRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        async function redoClasses() {
            await getAllClasses().then((item) => {
                setClasses([...item]);
            });
        }
        redoClasses();
    }, []);

    useEffect(() => {
        if (searchData.includes('/') || searchData.includes('[')) {
            console.log('ew');
        } else {
            const searchRegex = new RegExp(searchData, 'i');
            let isOneFound = false;
            let dataArr = [];
            if (classes !== null) {
                dataArr = classes.map((elem, idx) => {
                    if (
                        searchRegex.test(elem.name) ||
                        searchRegex.test(elem.teacher)
                    ) {
                        isOneFound = true;
                        // if(elem.subject === "Math") {
                        //     console.log(elem.subject)
                        // }
                        return (
                            <ClassTemplate
                                idx={idx}
                                anchor={isAuth ? `/${elem.name}` : null}
                                key={elem.name.split(' ').join('-') + idx}
                                name={elem.name}
                                teacher={elem.teacher}
                                description={elem.description}
                                credits={elem.credits}
                                class_id={elem.class_id}
                                maxStudents={elem.max_students}
                                semester={elem.semester}
                            />
                        );
                    }
                    return null;
                });
            }
            setClassHTML(dataArr);
            if (isOneFound === false) {
                setClassHTML(
                    <Label type={'p'} className="noClass">
                        There are no classes that match your search &gt;:&#40;
                    </Label>
                );
            }
        }
    }, [classes, searchData]);

    function advancedSearchFunction(sub, sem, cred, stat) {
        let isOneFound = false;
        let dataArr = [];

        if (classes !== null) {
            dataArr = classes.map((elem, idx) => {


                if (
                    elem.subject.match(sub) &&
                    String(elem.semester).match(sem) &&
                    String(elem.credits).match(cred)
                ) {
                    isOneFound = true;
                    return (
                        <ClassTemplate
                            idx={idx}
                            anchor={isAuth ? `/${elem.name}` : null}
                            key={elem.name.split(' ').join('-') + idx}
                            name={elem.name}
                            teacher={elem.teacher}
                            description={elem.description}
                            credits={elem.credits}
                            class_id={elem.class_id}
                            maxStudents={elem.max_students}
                            semester={elem.semester}
                        />
                    );
                }
                return null;
            });
        }
        setClassHTML(dataArr);
        console.log(dataArr)
        if (isOneFound === false) {
            setClassHTML(
                <Label type={'p'} className="noClass">
                    There are no classes that match your search &gt;:&#40;
                </Label>
            );
        }
    }

    function handleSetSearchBoxClass(operation) {
        if (operation === 'toggle') {
            searchButtonRef.current.classList.toggle('click');
            searchBoxRef.current.style.display =
                searchBoxRef.current.style.display == 'flex' ? 'none' : 'flex';
            innerSearchBoxRef.current.style.display =
                innerSearchBoxRef.current.style.display == 'flex'
                    ? 'none'
                    : 'flex';
        }
        if (operation === 'search') {
            searchButtonRef.current.classList.remove('click');
            searchBoxRef.current.style.display = 'none';
            innerSearchBoxRef.current.style.display = 'none';
        }
    }

    return (
        <Divider className="class">
            <Divider className="searchArea">
                <Divider className="searchBar">
                    <SearchSVG className={'searchSVG'} />
                    <TextInput
                        onFocus={(e) => handleSetSearchBoxClass('search')}
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
                    innerRef={searchButtonRef}
                    onClick={(e) => {
                        handleSetSearchBoxClass('toggle');
                    }}
                >
                    <Label type="p">Advanced Search</Label>
                    <ArrowDown color={'white'} />
                </Divider>
            </Divider>
            <Divider className="classes">{classHTML}</Divider>
            <Divider
                className="advancedSearchBoxSurround"
                innerRef={searchBoxRef}
                onClick={() => {
                    handleSetSearchBoxClass('toggle');
                }}
            ></Divider>
            <Divider className="advancedSearchBox" innerRef={innerSearchBoxRef}>
                <FormWrapper>
                    <Label type={'p'}>Subject</Label>
                    <select ref={subjectRef}>
                        <option></option>
                        <option>English</option>
                        <option>Science</option>
                        <option>Math</option>
                        <option>Art</option>
                        <option>Social Studies</option>
                    </select>
                    <Label type={'p'}>Semester</Label>
                    <select ref={semesterRef}>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <Label type={'p'}>Credits</Label>
                    <NumberInput innerRef={creditsRef} />
                    <Button
                        look={'standardBlue'}
                        onClick={(e) => {
                            console.log(subjectRef.current.value);
                            console.log(semesterRef.current.value);
                            console.log(creditsRef.current.value);
                            console.log(statusRef.current.value);
                            handleSetSearchBoxClass('search');

                            advancedSearchFunction(
                                subjectRef.current.value,
                                semesterRef.current.value,
                                creditsRef.current.value,
                                statusRef.current.value
                            );
                        }}
                    >
                        Search
                    </Button>
                </FormWrapper>
            </Divider>
        </Divider>
    );
}

export default Class;
