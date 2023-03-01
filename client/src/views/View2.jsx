import React, { useEffect, useState } from 'react';
// import { getAllStudents } from '/Users/adamdelcastillo-call/Documents/mtechaug22 HOMEWORK/Mtech 2/capstone-project/Capstone-project/client/src/data/getStudents.js';

function View2() {
    const [data, setData] = useState(null);

    // useEffect(() => {
    //     getAllStudents()
    //         .then((item) => {
    //             setData(item)
    //         })
    // }, []);

    return (
        <div>
            <h1>I'm view 2... :&#40; </h1>
        </div>
    );
}

export default View2;
