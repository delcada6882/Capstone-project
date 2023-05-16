import './classList.scss';
import { useEffect, useState, useRef } from 'react';
import ClassTemplate from '../../components/ClassTemplate/ClassTemplate.jsx';
import Div from 'HTML_components/Div/Div.js';
import TextInput from 'HTML_components/Inputs/TextInput/TextInput.jsx';
import Label from 'HTML_components/Label/Label.jsx';
import SearchSVG from '../../svg/SearchSVG.jsx';
import ArrowDown from '../../svg/ArrowDown.jsx';
import { getAllClasses } from '../../data/getClasses.js';
import Button from 'HTML_components/Button/Button.jsx';
import NumberInput from 'HTML_components/Inputs/NumberInput/NumberInput.jsx';
import FormWrapper from '../../components/Utillity components/FormWrapper/FormWrapper.jsx';
import UserSVG from '../../svg/UserSVG.jsx';
import { Class } from '../../data/Interfaces/Class';

function ClassList() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [classHTML, setClassHTML] = useState<(JSX.Element | null)[]>([null]);
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const innerSearchBoxRef = useRef<HTMLInputElement>(null);
    const userSVGRef = useRef<SVGSVGElement>(null);
    const userBackRef = useRef<HTMLButtonElement>(null);
    const innerUserBackRef = useRef<HTMLDivElement>(null);
    const [searchData, setSearchData] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isAuth, setIsAuth] = useState(false); // TODO: Hook this up when auth is implemented

    const subjectRef = useRef<HTMLSelectElement>(null);
    const semesterRef = useRef<HTMLSelectElement>(null);
    const creditsRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        async function redoClasses() {
            await getAllClasses()
                .then((item) => {
                    setClasses([...item]);
                })
                .catch(console.error);
        }
        redoClasses();
    }, []);

    useEffect(() => {
        if (searchData.includes('/') || searchData.includes('[')) {
        } else {
            const searchRegex = new RegExp(searchData, 'i');
            let isOneFound = false;
            let dataArr: (JSX.Element | null)[] = [];
            if (classes !== null) {
                dataArr = classes.map((elem, idx) => {
                    if (
                        searchRegex.test(elem.name) ||
                        searchRegex.test(elem.teacher ?? '')
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
                                max_student={elem.max_student}
                                semester={elem.semester}
                                start_time={elem.start_time}
                                end_time={elem.end_time}
                                subject={elem.subject}
                            />
                        );
                    }
                    return null;
                });
            }
            setClassHTML(dataArr);
            if (isOneFound === false) {
                setClassHTML([
                    <Label type={'p'} className="noClass">
                        There are no classes that match your search &gt;:&#40;
                    </Label>,
                ]);
            }
        }
    }, [classes, searchData, isAuth]);

    function advancedSearchFunction(sub: string, sem: string, cred: string) {
        let isOneFound = false;
        let dataArr: (JSX.Element | null)[] = [];

        if (classes !== null) {
            dataArr = classes.map((elem, idx) => {
                if (
                    String(elem.subject).match(sub) &&
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
                            max_student={elem.max_student}
                            semester={elem.semester}
                        />
                    );
                }
                return null;
            });
        }
        setClassHTML(dataArr);
        if (isOneFound === false) {
            setClassHTML([
                <Label type={'p'} className="noClass">
                    There are no classes that match your search &gt;:&#40;
                </Label>,
            ]);
        }
    }

    // function ClassModal(props) {
    //     return(
    //         <Div className={'classModal'}>
    //             <Div className={'topPart'}>
    //                 <Div className={'classAndTeach'}>
    //                     <Label className={'modalClass'}>{classFocus === undefined ? "" : classFocus.name}</Label>
    //                     <Label className={'modalTeach'}>Taught by Teacher</Label>
    //                 </Div>
    //                 <Label onClick={() => {SuperModalController.Hide('all')}} className={'close'}>X</Label>
    //             </Div>
    //             <Div>
    //                 <Label>Description</Label>
    //             </Div>
    //             <Div className={'bottomPart'}>
    //                 <Label>Start Time and End time</Label>
    //             </Div>
    //         </Div>
    //     )
    // }

    // useEffect(() => {
    //     SuperModalController.Display(<ClassModal />,
    //         { overlay: overlayOn, visible: overlayOn }
    //     );

    //     SuperModalController.Hide('all')
    // }, []);

    function handleSetSearchBoxClass(
        operation: 'toggle' | 'search',
        buttonRef?: React.RefObject<Element>,
        boxRef?: React.RefObject<HTMLElement>,
        innerBoxRef?: React.RefObject<HTMLElement>
    ) {
        if (operation === 'toggle') {
            if (buttonRef?.current) buttonRef.current.classList.toggle('click');
            if (boxRef?.current)
                boxRef.current.style.display =
                    boxRef.current.style.display === 'flex' ? 'none' : 'flex';
            if (innerBoxRef?.current)
                innerBoxRef.current.style.display =
                    innerBoxRef.current.style.display === 'flex'
                        ? 'none'
                        : 'flex';
        }
        if (operation === 'search') {
            if (searchButtonRef.current)
                searchButtonRef.current.classList.remove('click');
            if (searchBoxRef.current)
                searchBoxRef.current.style.display = 'none';
            if (innerSearchBoxRef.current)
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
        <Div className="class">
            <Div className="searchArea">
                <Div className="searchBar">
                    <SearchSVG className={'searchSVG'} />
                    <TextInput
                        onFocus={() =>
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
                </Div>
                <Button
                    className={'advancedSearch'}
                    look={'standardBlue'}
                    ref={searchButtonRef}
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
                </Button>
                <Div className={'userArea'}>
                    <UserSVG
                        color={'white'}
                        ref={userSVGRef}
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
                </Div>
                <Button
                    className={'userBoxSurround'}
                    ref={userBackRef}
                    onClick={() => {
                        handleSetSearchBoxClass(
                            'toggle',
                            userSVGRef,
                            userBackRef,
                            innerUserBackRef
                        );
                    }}
                ></Button>
                <Div className={'userBox'} ref={innerUserBackRef}>
                    <UserSVG color={'white'} />
                    <a className={'user'} href={'/'}>
                        User Name
                    </a>
                    <Label type={'p'} className={'info'}>
                        Info??
                    </Label>
                    <Button look={'standardBlue'}>Log out</Button>
                </Div>
            </Div>
            <Div className="classes">{classHTML}</Div>
            <Div
                className="advancedSearchBoxSurround"
                ref={searchBoxRef}
                onClick={() => {
                    handleSetSearchBoxClass(
                        'toggle',
                        searchButtonRef,
                        searchBoxRef,
                        innerSearchBoxRef
                    );
                }}
            ></Div>
            <Div className="advancedSearchBox" ref={innerSearchBoxRef}>
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
                    <NumberInput ref={creditsRef} />
                    <Button
                        look={'standardBlue'}
                        onClick={() => {
                            handleSetSearchBoxClass('search');
                            if (
                                subjectRef.current &&
                                semesterRef.current &&
                                creditsRef.current
                            )
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
            </Div>
        </Div>
    );
}

export default ClassList;
