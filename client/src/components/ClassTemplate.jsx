function ClassTemplate(props) { 

    return(
        <div className={'subClasses ' + props.name}>
            <div className="topPart">
                <h1>{props.name}</h1>
                <p>{props.teacher}</p>
            </div>
            <div className="middlePart">
                <h2>{props.description}</h2>
            </div>
            <div className="bottomPart">
                <p className="credits">credits: {props.credits}</p>
                <p className="student-amount">students: {props.students}/{props.maxStudents}</p>
                <p className="Semester">Semester: {props.semester}</p>
            </div>
        </div>
    );
}

export default ClassTemplate