import { useEffect, useState } from "react";
import ClassTemplate from "../components/ClassTemplate.jsx";
import SearchSVG from "../svg/SearchSVG.jsx";
import '../views/Class.scss'


function Class() {
    const [data, setData] = useState(null)
    const [classes, setClasses] = useState(null)
    const [classHTML, setClassHTML] = useState(null)

    const [searchData, setSearchData] = useState(null)

    const dateNow = new Date()
    const yearNow = dateNow.getFullYear()


    const notClass = {
        '1': {
            name: 'Computer Science',
            subject: 'Science',
            teacher: 'Cole Nelson',
            description: "It's a class about computer science, what else do you want from me?",
            credits: 4,
            semester: `Winter` + {yearNow},
            start_time: 1000,
            end_time: 1200,
            max_students: 20,
            current_am_students: 5
        },
        '2': {
            name: 'Advanced Research',
            subject: 'Writing',
            teacher: 'Susan Lastnamington',
            description: "It's a class about advanced research, what else do you want from me?",
            credits: 2,
            semester: `Spring` + {yearNow},
            start_time: 1200,
            end_time: 1300,
            max_students: 22,
            current_am_students: 10
        },
        '3': {
            name: 'Not a class',
            subject: 'Nothing',
            teacher: 'Nobody',
            description: "It's a class about nothing, this ISN'T A CLASS",
            credits: 0,
            semester: `never` + {yearNow},
            start_time: 0,
            end_time: 0,
            max_students: 0,
            current_am_students: 0
        }
    };

    useEffect(() => {
        setClasses(notClass)
        console.log(classes)
    }, [searchData])

    return(
        <div className="class">
            <div className="searchBar">
                <SearchSVG className={'searchSVG'}/>
                <input type={'text'} placeholder='Search classes here' onChange={(e) => {setSearchData(e.currentTarget.value)}}/>
            </div>
            <div className="classes">
                <ClassTemplate name={'Advanced Writing'} teacher={'Colleen Bond'} description={"You learn how to write like a pro by researching your own topics and writing whatever you set your heart on."} credits={2} students={2} maxStudents={30} semester={'Summer 2023'}/>
            </div>
        </div>
    );
}

export default Class