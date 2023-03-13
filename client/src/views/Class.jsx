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
import UserSVG from '../svg/UserSVG.jsx';

function Class() {
    const [classes, setClasses] = useState([]);
    const [classHTML, setClassHTML] = useState(null);
    const searchBoxRef = useRef();
    const searchButtonRef = useRef();
    const innerSearchBoxRef = useRef();
    const userSVGRef = useRef();
    const userBackRef = useRef();
    const innerUserBackRef = useRef();
    const [searchData, setSearchData] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [overlayOn, setOverlayOn] = useState(true);
    const [classFocus, setClassFocus] = useState();

    const subjectRef = useRef();
    const semesterRef = useRef();
    const creditsRef = useRef();

    useEffect(() => {
        async function redoClasses() {
            await getAllClasses().then((item) => {
                setClasses([...item]);
                console.log(item);
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
                                startTime={elem.start_time}
                                endTime={elem.end_time}
                                subject={elem.subject}
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

    function advancedSearchFunction(sub, sem, cred) {
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
                            onClickStudent={() => {
                                SuperModalController.Show('all');
                            }}
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
        console.log(dataArr);
        if (isOneFound === false) {
            setClassHTML(
                <Label type={'p'} className="noClass">
                    There are no classes that match your search &gt;:&#40;
                </Label>
            );
        }
    }

    // function ClassModal(props) {
    //     return(
    //         <Divider className={'classModal'}>
    //             <Divider className={'topPart'}>
    //                 <Divider className={'classAndTeach'}>
    //                     <Label className={'modalClass'}>{classFocus === undefined ? "" : classFocus.name}</Label>
    //                     <Label className={'modalTeach'}>Taught by Teacher</Label>
    //                 </Divider>
    //                 <Label onClick={() => {SuperModalController.Hide('all')}} className={'close'}>X</Label>
    //             </Divider>
    //             <Divider>
    //                 <Label>Description</Label>
    //             </Divider>
    //             <Divider className={'bottomPart'}>
    //                 <Label>Start Time and End time</Label>
    //             </Divider>
    //         </Divider>
    //     )
    // }

    // useEffect(() => {
    //     SuperModalController.Display(<ClassModal />,
    //         { overlay: overlayOn, visible: overlayOn }
    //     );

    //     SuperModalController.Hide('all')
    // }, []);

    function handleSetSearchBoxClass(
        operation,
        buttonRef,
        boxRef,
        innerBoxRef
    ) {
        if (operation === 'toggle') {
            buttonRef.current.classList.toggle('click');
            boxRef.current.style.display =
                boxRef.current.style.display == 'flex' ? 'none' : 'flex';
            innerBoxRef.current.style.display =
                innerBoxRef.current.style.display == 'flex' ? 'none' : 'flex';
        }
        if (operation === 'search') {
            searchButtonRef.current.classList.remove('click');
            searchBoxRef.current.style.display = 'none';
            innerSearchBoxRef.current.style.display = 'none';
        }
    }

    // function handleSetSearchBoxClass() {
    //     searchButtonRef.current.classList.toggle('click');
    //     searchBoxRef.current.style.display =
    //         searchBoxRef.current.style.display == 'flex' ? 'none' : 'flex';
    //     innerSearchBoxRef.current.style.display =
    //         innerSearchBoxRef.current.style.display == 'flex'
    //             ? 'none'
    //             : 'flex';
    // }

    return (
        <Divider className="class">
            <Divider className="searchArea">
                <Divider className="searchBar">
                    <SearchSVG className={'searchSVG'} />
                    <TextInput
                        onFocus={(e) =>
                            handleSetSearchBoxClass(
                                'search',
                                searchButtonRef,
                                searchBoxRef,
                                innerSearchBoxRef
                            )
                        }
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
                        handleSetSearchBoxClass(
                            'toggle',
                            searchButtonRef,
                            searchBoxRef,
                            innerSearchBoxRef
                        );
                    }}
                >
                    <Label type="p">Advanced Search</Label>
                    <ArrowDown color={'white'} />
                </Divider>
                <Divider className={'userArea'}>
                    <UserSVG
                        color={'white'}
                        innerRef={userSVGRef}
                        onClick={(e) => {
                            handleSetSearchBoxClass(
                                'search',
                                searchButtonRef,
                                searchBoxRef,
                                innerSearchBoxRef
                            );
                            handleSetSearchBoxClass(
                                'toggle',
                                userSVGRef,
                                userBackRef,
                                innerUserBackRef
                            );
                        }}
                    />
                </Divider>
                <Divider
                    className={'userBoxSurround'}
                    innerRef={userBackRef}
                    onClick={() => {
                        handleSetSearchBoxClass(
                            'toggle',
                            userSVGRef,
                            userBackRef,
                            innerUserBackRef
                        );
                    }}
                ></Divider>
                <Divider className={'userBox'} innerRef={innerUserBackRef}>
                    <UserSVG color={'white'} />
                    <a className={'user'} href={'/'}>
                        User Name
                    </a>
                    <Label type={'p'} className={'info'}>
                        Info??
                    </Label>
                    <Button look={'standardBlue'}>Log out</Button>
                </Divider>
            </Divider>
            <Divider className="classes">{classHTML}</Divider>
            <Divider
                className="advancedSearchBoxSurround"
                innerRef={searchBoxRef}
                onClick={() => {
                    handleSetSearchBoxClass(
                        'toggle',
                        searchButtonRef,
                        searchBoxRef,
                        innerSearchBoxRef
                    );
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
                            handleSetSearchBoxClass('search');

                            advancedSearchFunction(
                                subjectRef.current.value,
                                semesterRef.current.value,
                                creditsRef.current.value
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
