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

function Class() {
    const [classes, setClasses] = useState([]);
    const [classHTML, setClassHTML] = useState(null);
    const searchBoxRef = useRef();
    const searchButtonRef = useRef();
    const innerSearchBoxRef = useRef();
    const [searchData, setSearchData] = useState('');
    const [isAuth, setIsAuth] = useState(false)

    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();

    // const notClass = [
    //     {
    //         name: 'Computer Science',
    //         subject: 'Science',
    //         teacher: 'Cole Nelson',
    //         description:
    //             "It's a class about computer science, what else do you want from me?",
    //         credits: 4,
    //         semester: `Winter ${yearNow}`,
    //         start_time: 1000,
    //         end_time: 1200,
    //         max_students: 20,
    //         current_am_students: 5,
    //     },
    //     {
    //         name: 'Advanced Research',
    //         subject: 'Writing',
    //         teacher: 'Susan Lastnamington',
    //         description:
    //             "It's a class about advanced research, what else do you want from me?",
    //         credits: 2,
    //         semester: `Spring ${yearNow}`,
    //         start_time: 1200,
    //         end_time: 1300,
    //         max_students: 22,
    //         current_am_students: 10,
    //     },
    //     {
    //         name: 'Not a class',
    //         subject: 'Nothing',
    //         teacher: 'Nobody',
    //         description: "It's a class about nothing, this ISN'T A CLASS",
    //         credits: 0,
    //         semester: `never ${yearNow}`,
    //         start_time: 0,
    //         end_time: 0,
    //         max_students: 0,
    //         current_am_students: 0,
    //     },
    //     {
    //         name: 'Not a class',
    //         subject: 'Nothing',
    //         teacher: 'Nobody',
    //         description: "It's a class about nothing, this ISN'T A CLASS",
    //         credits: 0,
    //         semester: `never ${yearNow}`,
    //         start_time: 0,
    //         end_time: 0,
    //         max_students: 0,
    //         current_am_students: 0,
    //     },
    //     {
    //         name: 'Not a class',
    //         subject: 'Nothing',
    //         teacher: 'Nobody',
    //         description: "It's a class about nothing, this ISN'T A CLASS",
    //         credits: 0,
    //         semester: `never ${yearNow}`,
    //         start_time: 0,
    //         end_time: 0,
    //         max_students: 0,
    //         current_am_students: 0,
    //     },
    //     {
    //         name: 'Not a class',
    //         subject: 'Nothing',
    //         teacher: 'Nobody',
    //         description: "It's a class about nothing, this ISN'T A CLASS",
    //         credits: 0,
    //         semester: `never ${yearNow}`,
    //         start_time: 0,
    //         end_time: 0,
    //         max_students: 0,
    //         current_am_students: 0,
    //     },
    // ];
    useEffect(() => {
        async function redoClasses() {
            await getAllClasses().then((item) => {
                setClasses([...item]);
            });
        }
        redoClasses();
    }, []);

    useEffect(() => {
        if(searchData.includes('/') || searchData.includes('[')) {
            console.log('ew')
        }
        else {
            const searchRegex = new RegExp(searchData, 'i');
            let isOneFound = false;
            let dataArr = [];
            if (classes !== null) {
                dataArr = classes.map((elem, idx) => {
                    if (searchRegex.test(elem.name) || searchRegex.test(elem.teacher)) {
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
            if (isOneFound === false) {
                setClassHTML(
                    <Label type={'p'} className="noClass">
                        There are no classes that match your search &gt;:&#40;
                    </Label>
                );
            }
        }

        
    }, [classes, searchData]);

    function handleSetSearchBoxClass(operation) {
        if(operation === 'toggle') {
            console.log('tog')
            searchButtonRef.current.classList.toggle('click');
            searchBoxRef.current.style.display =
                searchBoxRef.current.style.display == 'flex' ? 'none' : 'flex';
            innerSearchBoxRef.current.style.display =
                innerSearchBoxRef.current.style.display == 'flex' ? 'none' : 'flex';
        }
        if(operation === 'search') {
            searchButtonRef.current.classList.remove('click');
            searchBoxRef.current.style.display = 'none'
            innerSearchBoxRef.current.style.display = 'none'
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
                    <select>
                        <option></option>
                        <option>English</option>
                        <option>Science</option>
                        <option>Math</option>
                        <option>Art</option>
                        <option>Social Studies</option>
                    </select>
                    <Label type={'p'}>Semester</Label>
                    <select>
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <Label type={'p'}>Credits</Label>
                    <NumberInput />
                    <Label type={'p'}>Status</Label>
                    <select>
                        <option></option>
                        <option>Less than Half Capacity</option>
                        <option>Half Capacity</option>
                        <option>Full</option>
                    </select>
                    <Button look={'standardBlue'}>Search</Button>
                </FormWrapper>

            </Divider>
        </Divider>
    );
}

export default Class;
